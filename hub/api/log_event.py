#!/usr/bin/env python3
import sys
import os
import argparse
import time

# Ensure we can import db.py
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from db import get_connection

def log_event(skill_name, action, tokens_saved=0, revenue_generated=0.0):
    try:
        conn = get_connection()
        c = conn.cursor()
        now = int(time.time())
        c.execute('''
            INSERT INTO events (timestamp, skill_name, action, tokens_saved, revenue_generated)
            VALUES (?, ?, ?, ?, ?)
        ''', (now, skill_name, action, tokens_saved, revenue_generated))
        conn.commit()
        conn.close()
    except Exception as e:
        # Ignore errors for background logging so it doesn't break CLI wrappers
        pass

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Log telemetry event to Wizard-AI database")
    parser.add_argument("skill_name", help="Name of the skill or tool")
    parser.add_argument("action", help="Action performed (e.g. 'execute', 'install')")
    parser.add_argument("tokens_saved", nargs="?", type=int, default=0, help="Tokens saved (optional)")
    parser.add_argument("revenue", nargs="?", type=float, default=0.0, help="Revenue generated (optional)")
    
    args = parser.parse_args()
    log_event(args.skill_name, args.action, args.tokens_saved, args.revenue)
