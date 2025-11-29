#!/bin/bash

# Production startup script for AI Quiz Generator Service
# This script should be run on your VPS

echo "==================================="
echo "AI Quiz Generator - Production Setup"
echo "==================================="

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "Project directory: $SCRIPT_DIR"

# 1. Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed!"
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"

# 2. Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# 3. Activate virtual environment
source venv/bin/activate

echo "✓ Virtual environment activated"

# 4. Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# 5. Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "✓ Dependencies installed"

# 6. Check for .env file
if [ ! -f ".env" ]; then
    echo "ERROR: .env file not found!"
    echo "Please create a .env file with GOOGLE_API_KEY"
    exit 1
fi

# 7. Display configuration
echo ""
echo "==================================="
echo "Configuration:"
echo "==================================="
PORT=$(grep -E '^PORT=' .env | cut -d '=' -f 2)
PORT=${PORT:-8800}
echo "Port: $PORT"
echo "API Key configured: $(grep -c GOOGLE_API_KEY .env)"
echo ""

# 8. Start the service with Gunicorn (production)
echo "Starting AI service with Gunicorn..."
echo "Access the service at: http://0.0.0.0:$PORT"
echo ""
echo "Press Ctrl+C to stop the service"
echo ""

# Run with Gunicorn (4 workers, production-grade)
gunicorn -w 4 -b 0.0.0.0:$PORT --timeout 120 --access-logfile - --error-logfile - app:app

# If Gunicorn is not available, fallback to Flask development server
if [ $? -ne 0 ]; then
    echo "Gunicorn failed, falling back to Flask..."
    python3 app.py
fi
