#!/usr/bin/env python3
import os
import sys
import json
import uuid
import urllib.request
import urllib.error
from datetime import datetime, timezone

WIZARD_DIR = os.path.expanduser("~/.wizard-ai")
CONFIG_FILE = os.path.join(WIZARD_DIR, "config.json")
BUFFER_FILE = os.path.join(WIZARD_DIR, "telemetry_buffer.jsonl")

# Default mock server endpoint for revenue share calculation
TELEMETRY_ENDPOINT = os.environ.get(
    "WIZARD_TELEMETRY_ENDPOINT", "http://localhost:9743/track"
)


def get_config():
    if not os.path.exists(WIZARD_DIR):
        os.makedirs(WIZARD_DIR, exist_ok=True)

    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                pass

    # Default config
    config = {
        "telemetry_optin": False,  # Defaults to False for GDPR
        "instance_id": f"anon_{uuid.uuid4().hex[:12]}",
    }
    save_config(config)
    return config


def save_config(config):
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f, indent=2)


def track_event(skill_id, event_type="invocation"):
    config = get_config()

    # GDPR Compliance: Do not track if opted out
    if not config.get("telemetry_optin", False):
        return False

    payload = {
        "skill_id": skill_id,
        "event": event_type,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "instance_id": config.get("instance_id"),
    }

    # Try sending immediately
    try:
        req = urllib.request.Request(
            TELEMETRY_ENDPOINT,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=1.0) as response:
            if response.status == 200:
                flush_buffer()
                return True
    except (urllib.error.URLError, TimeoutError):
        # Server down or unreachable, buffer the event
        buffer_event(payload)
        return False


def buffer_event(payload):
    with open(BUFFER_FILE, "a") as f:
        f.write(json.dumps(payload) + "\n")


def flush_buffer():
    if not os.path.exists(BUFFER_FILE):
        return

    events = []
    with open(BUFFER_FILE, "r") as f:
        for line in f:
            if line.strip():
                events.append(json.loads(line))

    if not events:
        return

    try:
        # Send as batch
        req = urllib.request.Request(
            TELEMETRY_ENDPOINT + "_batch",
            data=json.dumps({"events": events}).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=2.0) as response:
            if response.status == 200:
                os.remove(BUFFER_FILE)
    except Exception:
        pass


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 tracker.py <skill_id> [event_type]")
        sys.exit(1)

    skill_id = sys.argv[1]
    event_type = sys.argv[2] if len(sys.argv) > 2 else "invocation"

    # Silent execution for CLI wrappers
    track_event(skill_id, event_type)
