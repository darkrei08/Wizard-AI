FROM python:3.12-slim

# Install dependencies required for our bash scripts (e.g., jq for ai-quota) and curl for healthcheck
RUN apt-get update && apt-get install -y jq curl && rm -rf /var/lib/apt/lists/*

# Create a non-root user for security
RUN groupadd -r wizardai && useradd -r -g wizardai -d /home/wizardai -m wizardai

# Set working directory
WORKDIR /app

# Copy the hub and bin directories
COPY hub /app/hub
COPY bin /app/bin

# Make scripts executable and change ownership to non-root user
RUN chmod +x /app/bin/* && chown -R wizardai:wizardai /app

# Switch to the non-root user
USER wizardai

# Ensure database directory exists inside container for the non-root user
RUN mkdir -p /home/wizardai/.config/wizard-ai /home/wizardai/.local/share/cockpit-tools

# Add healthcheck to monitor container status
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://127.0.0.1:9742/ || exit 1

# Expose the dashboard port
EXPOSE 9742

# Command to run the dashboard (bind to 0.0.0.0 in Docker)
CMD ["python", "hub/api/server.py", "--port", "9742", "--bind", "0.0.0.0"]
