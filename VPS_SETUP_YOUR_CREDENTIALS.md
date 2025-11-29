# Your VPS Setup - Personalized Instructions

## Your VPS Details

```
VPS IP:        72.61.209.163
VPS Username:  root
VPS Password:  WOLhxiAgPssTz3CUsO;7
Plan Admin:    admin / Puptcqbs#234
```

---

## Step 1: Connect to Your VPS

### Windows (PowerShell)
```powershell
ssh root@72.61.209.163
# When prompted for password, paste: WOLhxiAgPssTz3CUsO;7
```

### Mac/Linux (Terminal)
```bash
ssh root@72.61.209.163
# When prompted for password, paste: WOLhxiAgPssTz3CUsO;7
```

You should see:
```
root@vps-xyz:~#
```

---

## Step 2: Navigate to Project & Pull Latest Code

Once connected to VPS, paste these commands:

```bash
# Navigate to project
cd ~/PUPQUIZ

# If that doesn't work, try:
cd /root/PUPQUIZ

# Pull latest code
git pull origin main
```

---

## Step 3: Setup Python Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Wait 2-3 minutes for dependencies to install.

---

## Step 4: Install PM2 & Node.js

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Verify
pm2 --version
```

---

## Step 5: Start Your Python Service

```bash
# Make sure you're in project directory
cd ~/PUPQUIZ

# Start with PM2
pm2 start app.py --name ai-quiz-service --interpreter python3

# Setup auto-start on reboot
pm2 startup
# Copy the entire command it shows and paste it

# Save configuration
pm2 save

# Verify it's running
pm2 status
```

Should show **online** in green ✓

---

## Step 6: Check Logs

```bash
# View logs to confirm service started
pm2 logs ai-quiz-service

# Should show:
# Starting Quiz Generation API server on http://0.0.0.0:8800
# Debug mode: False
# API Key configured: Yes
```

Press `Ctrl+C` to exit logs.

---

## Step 7: Allow Firewall Port

```bash
# Check firewall status
sudo ufw status

# If it says "active", allow port 8800:
sudo ufw allow 8800

# If it says "inactive", skip this
```

---

## Step 8: Get Your VPS IP (Confirmation)

```bash
hostname -I
```

Should show: `72.61.209.163 10.0.0.1`

Your public IP: **72.61.209.163** ✓

---

## Step 9: Test Service

```bash
# Test locally first
curl http://localhost:8800/health

# Should return:
# {"status":"healthy","service":"Quiz Generation API","version":"1.0.0"}
```

---

## Step 10: Exit VPS

```bash
exit
```

---

## Step 11: Update Your Main Website Server

Now connect to your **Hostinger main website server** and do this:

```bash
# Navigate to your website
cd ~/puptquiz

# Edit .env file
nano .env

# Find line 96 (around there):
VITE_AI_SERVICE_URL=http://localhost:8800

# Replace with:
VITE_AI_SERVICE_URL=http://72.61.209.163:8800

# Save: Ctrl+X, then Y, then Enter
```

---

## Step 12: Rebuild Frontend

```bash
# Install/update dependencies
npm install

# Rebuild frontend
npm run build
```

Wait 1-2 minutes.

---

## Step 13: Verify Connection

```bash
# Test connection from main server
curl http://72.61.209.163:8800/health

# Should return JSON response
```

---

## Step 14: Test on Live Website

1. Open browser: https://puptquiz.com
2. Navigate to "Explore" or "AI Quiz Generator"
3. Try to generate a quiz
4. **It should work!** ✓

---

## Quick Reference - Your VPS Commands

```bash
# Connect to VPS
ssh root@72.61.209.163
# Password: WOLhxiAgPssTz3CUsO;7

# Check if service is running
pm2 status

# View service logs
pm2 logs ai-quiz-service

# Restart service
pm2 restart ai-quiz-service

# Stop service
pm2 stop ai-quiz-service

# Test service
curl http://localhost:8800/health
```

---

## If Something Goes Wrong

### Service Not Running?
```bash
ssh root@72.61.209.163
pm2 logs ai-quiz-service
# Check for errors in the output
pm2 restart ai-quiz-service
```

### Can't Connect?
```bash
ssh root@72.61.209.163
# From VPS
curl http://localhost:8800/health

# From main server
curl http://72.61.209.163:8800/health

# Check firewall
sudo ufw status
```

### Still Not Working?
```bash
ssh root@72.61.209.163
# Check if Python is running
ps aux | grep app.py

# Check logs
pm2 logs ai-quiz-service

# Try restarting
pm2 restart ai-quiz-service
```

---

## Completion Checklist

- [ ] Connected to VPS (72.61.209.163)
- [ ] Pulled latest code
- [ ] Created Python virtual environment
- [ ] Installed dependencies
- [ ] Installed Node.js and PM2
- [ ] Started service with PM2
- [ ] Set up PM2 auto-start
- [ ] Allowed firewall port 8800
- [ ] Verified service is running (pm2 status = online)
- [ ] Updated main website .env with VPS IP
- [ ] Rebuilt frontend (npm run build)
- [ ] Tested connection (curl works)
- [ ] Tested on live website (https://puptquiz.com)

---

## Important Notes

1. **Your VPS IP:** 72.61.209.163 (use this in VITE_AI_SERVICE_URL)
2. **Service runs on:** Port 8800
3. **PM2 keeps it running:** 24/7, even after restart
4. **Google API Key:** Already in .env file
5. **Service should be online:** Check with `pm2 status`

---

Good luck! You've got this! 🚀
