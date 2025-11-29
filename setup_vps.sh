#!/bin/bash

# VPS PUPQUIZ AI Service - Automated Setup Script
# This script automates the entire setup process
# Just run: bash setup_vps.sh

set -e  # Exit on any error

echo "=========================================="
echo "PUPQUIZ AI Service - VPS Setup Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${GREEN}→${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
   print_error "This script must be run as root (use: sudo bash setup_vps.sh)"
   exit 1
fi

# STEP 1: Navigate to project
print_step "Navigating to project directory..."
if [ ! -d "~/PUPQUIZ" ]; then
    if [ ! -d "/root/PUPQUIZ" ]; then
        print_error "PUPQUIZ directory not found!"
        echo "Please ensure the project is cloned to ~/PUPQUIZ or /root/PUPQUIZ"
        exit 1
    fi
    cd /root/PUPQUIZ
else
    cd ~/PUPQUIZ
fi
print_success "Project directory: $(pwd)"

# STEP 2: Pull latest code
print_step "Pulling latest code from GitHub..."
git pull origin main
print_success "Code updated"

# STEP 3: Create virtual environment
print_step "Creating Python virtual environment..."
if [ -d "venv" ]; then
    print_success "Virtual environment already exists"
else
    python3 -m venv venv
    print_success "Virtual environment created"
fi

# STEP 4: Activate virtual environment and install dependencies
print_step "Activating virtual environment..."
source venv/bin/activate
print_success "Virtual environment activated"

print_step "Installing Python dependencies..."
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt > /dev/null 2>&1
print_success "Dependencies installed"

# STEP 5: Check Node.js
print_step "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_step "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
    apt-get install -y nodejs > /dev/null 2>&1
    print_success "Node.js installed: $(node --version)"
else
    print_success "Node.js already installed: $(node --version)"
fi

# STEP 6: Check PM2
print_step "Checking PM2 installation..."
if ! npm list -g pm2 > /dev/null 2>&1; then
    print_step "Installing PM2..."
    npm install -g pm2 > /dev/null 2>&1
    print_success "PM2 installed: $(pm2 --version)"
else
    print_success "PM2 already installed: $(pm2 --version)"
fi

# STEP 7: Stop existing service if running
print_step "Checking for existing service..."
if pm2 list | grep -q "ai-quiz-service"; then
    print_step "Stopping existing service..."
    pm2 stop ai-quiz-service > /dev/null 2>&1
    pm2 delete ai-quiz-service > /dev/null 2>&1
    print_success "Existing service stopped"
else
    print_success "No existing service found"
fi

# STEP 8: Start service with PM2
print_step "Starting AI Quiz Service with PM2..."
pm2 start app.py --name ai-quiz-service --interpreter python3 > /dev/null 2>&1
print_success "Service started"

# Wait for service to start
sleep 2

# STEP 9: Setup PM2 to start on reboot
print_step "Setting up auto-start on reboot..."
pm2 startup > /dev/null 2>&1
pm2 save > /dev/null 2>&1
print_success "Auto-start configured"

# STEP 10: Check firewall
print_step "Checking firewall status..."
if sudo ufw status | grep -q "Status: active"; then
    print_step "Firewall is active, allowing port 8800..."
    sudo ufw allow 8800 > /dev/null 2>&1
    print_success "Port 8800 allowed"
else
    print_success "Firewall is inactive (no action needed)"
fi

# STEP 11: Verify service is running
print_step "Verifying service is running..."
if pm2 status | grep -q "online"; then
    print_success "Service is online"
else
    print_error "Service status is not online"
    pm2 logs ai-quiz-service | tail -20
    exit 1
fi

# STEP 12: Test service
print_step "Testing service health check..."
sleep 2
if curl -s http://localhost:8800/health > /dev/null 2>&1; then
    print_success "Service responding to health check"
    curl -s http://localhost:8800/health | python3 -m json.tool
else
    print_error "Service health check failed"
    exit 1
fi

# STEP 13: Get VPS IP
print_step "Getting VPS IP address..."
VPS_IP=$(hostname -I | awk '{print $1}')
print_success "VPS IP: $VPS_IP"

# Final summary
echo ""
echo "=========================================="
echo "✓ VPS Setup Complete!"
echo "=========================================="
echo ""
echo "Your Service Information:"
echo "  Service Name: ai-quiz-service"
echo "  Service URL: http://$VPS_IP:8800"
echo "  Status: Online"
echo ""
echo "Health Check:"
echo "  Local: curl http://localhost:8800/health"
echo "  Remote: curl http://$VPS_IP:8800/health"
echo ""
echo "Next Steps:"
echo "  1. Update your main website .env:"
echo "     VITE_AI_SERVICE_URL=http://$VPS_IP:8800"
echo "  2. Rebuild frontend: npm run build"
echo "  3. Test on website: https://puptquiz.com"
echo ""
echo "Useful Commands:"
echo "  Check status: pm2 status"
echo "  View logs: pm2 logs ai-quiz-service"
echo "  Restart: pm2 restart ai-quiz-service"
echo "  Stop: pm2 stop ai-quiz-service"
echo ""
echo "=========================================="
echo ""

print_success "Setup completed successfully! 🎉"
