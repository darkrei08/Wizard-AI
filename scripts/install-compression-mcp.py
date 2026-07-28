import os
import json
import urllib.request
import zipfile

HOME = os.path.expanduser("~")
LOCAL_BIN = os.path.join(HOME, ".local", "bin")
os.makedirs(LOCAL_BIN, exist_ok=True)

# 1. Install lean-ctx directly via release
print("Installing lean-ctx...")
lean_ctx_url = "https://github.com/yvgude/lean-ctx/releases/latest/download/lean-ctx-x86_64-pc-windows-msvc.zip"
lean_ctx_zip = os.path.join(LOCAL_BIN, "lean-ctx.zip")
try:
    urllib.request.urlretrieve(lean_ctx_url, lean_ctx_zip)
    with zipfile.ZipFile(lean_ctx_zip, 'r') as zip_ref:
        zip_ref.extractall(LOCAL_BIN)
    os.remove(lean_ctx_zip)
    print("lean-ctx installed successfully.")
except Exception as e:
    print(f"Failed to install lean-ctx: {e}")

# 2. Install RTK
print("Installing RTK...")
rtk_url = "https://github.com/rtk-ai/rtk/releases/latest/download/rtk-x86_64-pc-windows-msvc.zip"
rtk_zip = os.path.join(LOCAL_BIN, "rtk.zip")
try:
    urllib.request.urlretrieve(rtk_url, rtk_zip)
    with zipfile.ZipFile(rtk_zip, 'r') as zip_ref:
        zip_ref.extractall(LOCAL_BIN)
    os.remove(rtk_zip)
    print("RTK installed successfully.")
except Exception as e:
    print(f"Failed to install RTK: {e}")

# 3. Configure MCP servers in Pi
print("Configuring MCP servers...")
pi_settings_path = os.path.join(HOME, ".pi", "agent", "settings.json")
if os.path.exists(pi_settings_path):
    with open(pi_settings_path, 'r', encoding='utf-8') as f:
        settings = json.load(f)
    
    mcp_servers = settings.get("mcpServers", {})
    
    # Configure Engram
    mcp_servers["engram"] = {
        "command": "npx",
        "args": ["-y", "gentle-engram", "mcp"]
    }
    
    # Configure Codebase Memory
    mcp_servers["codebase-memory-mcp"] = {
        "command": "npx",
        "args": ["-y", "@deusdata/codebase-memory-mcp"]
    }
    
    settings["mcpServers"] = mcp_servers
    
    with open(pi_settings_path, 'w', encoding='utf-8') as f:
        json.dump(settings, f, indent=2)
    print("MCP servers configured in Pi.")
else:
    print("Pi settings.json not found.")
