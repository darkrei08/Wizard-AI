FROM python:3.12-slim

# Install dependencies required for our bash scripts (e.g., jq for ai-quota)
RUN apt-get update && apt-get install -y jq && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the hub and bin directories
COPY hub /app/hub
COPY bin /app/bin

# Make scripts executable
RUN chmod +x /app/bin/*

# Ensure database directory exists inside container
RUN mkdir -p /root/.config/wizard-ai /root/.local/share/cockpit-tools

# Expose the dashboard port
EXPOSE 9742

# Command to run the dashboard
CMD ["python", "hub/api/server.py", "--port", "9742"]
