# Production Setup Guide for AI Quiz Generator on Hostinger VPS

## Overview
This guide will help you set up the Python AI service in production on your Hostinger VPS.

## Prerequisites
- Hostinger VPS with root/sudo access
- Python 3.9+ installed
- Your main website running on the main server
- Port 8800 available (or configure a different port)

---

## Step-by-Step Setup

### 1. SSH into Your VPS

```bash
ssh root@your-vps-ip
```

### 2. Create a Project Directory (if not already there)

```bash
# Navigate to home or preferred location
cd /home/yourusername

# Clone or upload your project
git clone https://github.com/operiokmeo/PUPQUIZ.git
cd PUPQUIZ
```

### 3. Setup Python Virtual Environment

```bash
# Install Python development tools (if needed)
apt-get update
apt-get install -y python3 python3-venv python3-pip

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create/update `.env` file with your VPS configuration:

```bash
nano .env
```

Add these lines:
```env
# Port for Python service
PORT=8800

# Environment
APP_ENV=production

# Google API Key (get from Google Cloud Console)
GOOGLE_API_KEY=AIzaSyCAo26Wk8t7ryLLfO0NWXa8cSy2eBhY8s0

# Frontend URL (configure on your main website server)
VITE_AI_SERVICE_URL=http://YOUR-VPS-IP:8800
```

Replace `YOUR-VPS-IP` with your actual VPS IP address.

### 6. Test the Service Locally

```bash
# Run the service to test
python3 app.py
```

If it starts successfully, you'll see:
```
Starting Quiz Generation API server on http://0.0.0.0:8800
Debug mode: False
API Key configured: Yes
```

Press `Ctrl+C` to stop it.

### 7. Setup Gunicorn (Production WSGI Server)

```bash
# Install Gunicorn
pip install gunicorn

# Test with Gunicorn
gunicorn -w 4 -b 0.0.0.0:8800 app:app
```

### 8. Setup PM2 (Keep Service Running 24/7)

```bash
# Install Node.js (required for PM2)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Start the service with PM2
pm2 start app.py --name ai-quiz-service --interpreter python3 --env PORT=8800,APP_ENV=production

# Save PM2 configuration to restart on reboot
pm2 save
pm2 startup

# View logs
pm2 logs ai-quiz-service

# Check status
pm2 status
```

### 9. Configure Firewall

```bash
# If using UFW firewall
ufw allow 8800

# If using iptables
iptables -A INPUT -p tcp --dport 8800 -j ACCEPT
```

### 10. Configure Your Main Website

On your **Hostinger main server** (where Laravel is running), update `.env`:

```bash
# The URL of your VPS Python service
VITE_AI_SERVICE_URL=http://YOUR-VPS-IP:8800
```

Then rebuild your frontend assets:
```bash
npm run build
```

### 11. Test the Connection

From your main server, test if it can reach the Python service:

```bash
curl -X GET http://YOUR-VPS-IP:8800/health
```

You should get:
```json
{
  "status": "healthy",
  "service": "Quiz Generation API",
  "version": "1.0.0"
}
```

---

## Troubleshooting

### Service Not Starting
```bash
# Check for port conflicts
lsof -i :8800

# Check logs
pm2 logs ai-quiz-service

# Check if Python service is running
ps aux | grep app.py
```

### Can't Connect from Main Website
```bash
# From main server, test connection
curl -v http://YOUR-VPS-IP:8800/health

# Check if port is open
nc -zv YOUR-VPS-IP 8800

# Check VPS firewall
ufw status
iptables -L -n | grep 8800
```

### Google API Key Not Working
- Verify `GOOGLE_API_KEY` is set in `.env`
- Check API key is valid at https://console.cloud.google.com/
- Ensure API is enabled for the key

### High Memory Usage
```bash
# Limit memory in PM2
pm2 restart ai-quiz-service
pm2 set ai-quiz-service max_memory_restart 500M
```

---

## Useful PM2 Commands

```bash
# Start service
pm2 start app.py --name ai-quiz-service --interpreter python3

# Stop service
pm2 stop ai-quiz-service

# Restart service
pm2 restart ai-quiz-service

# Delete from PM2
pm2 delete ai-quiz-service

# View live logs
pm2 logs ai-quiz-service

# View all services
pm2 list

# Monitor resources
pm2 monit
```

---

## Production Checklist

- [ ] Virtual environment created and activated
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file configured with PORT and GOOGLE_API_KEY
- [ ] Service tested locally with `python3 app.py`
- [ ] Service tested with Gunicorn
- [ ] PM2 installed and service started
- [ ] PM2 startup enabled for reboot
- [ ] Firewall port 8800 allowed
- [ ] Main website `.env` configured with correct `VITE_AI_SERVICE_URL`
- [ ] Frontend assets rebuilt (`npm run build`)
- [ ] Connection tested with `curl http://VPS-IP:8800/health`
- [ ] AI quiz generation tested from website

---

## Alternative: Using Nginx as Reverse Proxy (Optional)

For better security and performance:

```nginx
server {
    listen 8800;
    server_name _;

    location / {
        proxy_pass http://localhost:8801;  # Flask runs on 8801 internally
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

---

## Support

If you have issues:
1. Check logs: `pm2 logs ai-quiz-service`
2. Verify connection: `curl http://YOUR-VPS-IP:8800/health`
3. Check firewall: `ufw status`
4. Restart service: `pm2 restart ai-quiz-service`
