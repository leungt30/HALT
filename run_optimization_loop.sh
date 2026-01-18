#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Shutting down services..."
    kill $(jobs -p) 2>/dev/null
    # Kill feedback server if it exists
    if [ -n "$FEEDBACK_PID" ]; then
        kill $FEEDBACK_PID 2>/dev/null
    fi
    exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Using Vercel production endpoints (halt-backend.vercel.app, halt-frontend.vercel.app)
# No need to start local backend/frontend

# Start Feedback Display Server (background)
echo "🖥️  Starting Feedback Display Server..."
cd "$SCRIPT_DIR/store-manager-ai"
../.venv/bin/python feedback_server.py &
FEEDBACK_PID=$!
sleep 2

# Open Feedback Display in Chrome (bottom-right positioned window)
echo "🌐 Opening Feedback Display..."
osascript <<EOF
tell application "Google Chrome"
    activate
    set feedbackWindow to make new window
    set URL of active tab of feedbackWindow to "http://localhost:8001"
    set bounds of feedbackWindow to {1050, 450, 1850, 950}
end tell
EOF

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
