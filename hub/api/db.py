import sqlite3
import os
import time
from datetime import datetime
import random

DB_DIR = os.path.expanduser("~/.config/wizard-ai")
DB_PATH = os.path.join(DB_DIR, "telemetry.db")


def get_connection():
    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    c = conn.cursor()

    # Create events table
    c.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp INTEGER NOT NULL,
            skill_name TEXT NOT NULL,
            action TEXT NOT NULL,
            tokens_saved INTEGER DEFAULT 0,
            revenue_generated REAL DEFAULT 0.0
        )
    """)

    # Check if we need to insert mock data
    c.execute("SELECT COUNT(*) FROM events")
    if c.fetchone()[0] == 0:
        _insert_mock_data(c)

    conn.commit()
    conn.close()


def _insert_mock_data(cursor):
    """Insert realistic mock data for the last 6 months to populate the chart."""
    now = int(time.time())

    # Generate data for the last 6 months
    skills = ["ai-compress", "ai-graph", "ai-mem", "ai-taste"]

    for i in range(180, 0, -1):
        # 1-3 events per day
        for _ in range(random.randint(1, 3)):
            event_time = now - (i * 86400) + random.randint(0, 86000)
            skill = random.choice(skills)

            tokens = (
                random.randint(1000, 50000)
                if skill == "ai-compress"
                else random.randint(100, 5000)
            )
            revenue = round(random.uniform(0.1, 2.5), 2)

            cursor.execute(
                """
                INSERT INTO events (timestamp, skill_name, action, tokens_saved, revenue_generated)
                VALUES (?, ?, ?, ?, ?)
            """,
                (event_time, skill, "execute", tokens, revenue),
            )


def get_stats():
    """Retrieve aggregated stats for the dashboard."""
    conn = get_connection()
    c = conn.cursor()

    now = datetime.now()
    first_day_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    first_day_timestamp = int(first_day_of_month.timestamp())

    # 1. Total Revenue & Tokens Saved
    c.execute("SELECT SUM(revenue_generated), SUM(tokens_saved) FROM events")
    totals = c.fetchone()
    total_revenue = totals[0] or 0.0
    total_tokens = totals[1] or 0

    # 2. This Month Revenue
    c.execute(
        "SELECT SUM(revenue_generated) FROM events WHERE timestamp >= ?",
        (first_day_timestamp,),
    )
    month_revenue = c.fetchone()[0] or 0.0

    # 3. Monthly Chart Data (Last 6 months)
    chart_labels = []
    chart_data = []

    for i in range(5, -1, -1):
        target_month = now.month - i
        target_year = now.year
        if target_month <= 0:
            target_month += 12
            target_year -= 1

        start_ts = int(datetime(target_year, target_month, 1).timestamp())

        # Calculate end_ts (first day of next month)
        next_month = target_month + 1
        next_year = target_year
        if next_month > 12:
            next_month = 1
            next_year += 1
        end_ts = int(datetime(next_year, next_month, 1).timestamp())

        c.execute(
            "SELECT SUM(revenue_generated) FROM events WHERE timestamp >= ? AND timestamp < ?",
            (start_ts, end_ts),
        )
        month_sum = c.fetchone()[0] or 0.0

        month_name = datetime(target_year, target_month, 1).strftime("%b")
        chart_labels.append(month_name)
        chart_data.append(round(month_sum, 2))

    # 4. Active Skills Count
    c.execute("SELECT COUNT(DISTINCT skill_name) FROM events")
    active_skills = c.fetchone()[0] or 0

    conn.close()

    return {
        "total_revenue": round(total_revenue, 2),
        "month_revenue": round(month_revenue, 2),
        "total_tokens_saved": total_tokens,
        "active_skills": active_skills,
        "chart": {"labels": chart_labels, "data": chart_data},
    }


if __name__ == "__main__":
    init_db()
    print("DB Initialized.")
    print(get_stats())
