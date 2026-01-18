#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Shutting down services..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "🚀 Starting Customer AI Agent Service..."
cd "$SCRIPT_DIR/customer-ai-agent"
# Ensure we are using the virtual environment
../.venv/bin/uvicorn server:app --host 0.0.0.0 --port 8000 &
CUSTOMER_PID=$!

# Wait for service to be up
echo "⏳ Waiting for Customer Service to initialize..."
sleep 5

echo "🚀 Starting Store Manager AI..."
cd "$SCRIPT_DIR/store-manager-ai"
../.venv/bin/python agent.py

# Wait for all background jobs
wait
