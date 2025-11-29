# VPS Setup - Copy & Paste Commands

## Before You Start

You need:
- VPS IP address (from Hostinger)
- VPS password (from Hostinger)

---

## SECTION 1: Connect to VPS

### For Windows (PowerShell)
```powershell
# Open PowerShell and paste this:
ssh root@YOUR_VPS_IP

# When prompted, paste your VPS password
```

### For Mac/Linux (Terminal)
```bash
# Open Terminal and paste this:
ssh root@YOUR_VPS_IP

# When prompted, paste your VPS password
```

**Save your VPS IP here:**
```
VPS_IP = ___________________
```

---

## SECTION 2: Once You're Connected (All Users)

Paste these commands ONE BY ONE (wait for each to finish):

### Command 1: Navigate to Project
```bash
cd ~/PUPQUIZ
```
If error, try: `cd /root/PUPQUIZ`

### Command 2: Pull Latest Code
```bash
git pull origin main
```

### Command 3: Create Virtual Environment
```bash
python3 -m venv venv
```
Wait ~30 seconds

### Command 4: Activate Virtual Environment
```bash
source venv/bin/activate
```
You should see `(venv)` at the start of your prompt

### Command 5: Install Python Dependencies
```bash
pip install -r requirements.txt
```
Wait 2-3 minutes for downloads to complete

### Command 6: Install Node.js (if not installed)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```
Wait for completion

### Command 7: Install PM2 Globally
```bash
npm install -g pm2
```

### Command 8: Start Your Service with PM2
```bash
pm2 start app.py --name ai-quiz-service --interpreter python3
```
Should show green "online"

### Command 9: Setup Auto-Start on Reboot
```bash
pm2 startup
```
This will output a long command. **COPY that entire command and paste it below this line, then execute it.**

### Command 10: Save PM2 Configuration
```bash
pm2 save
```

### Command 11: Allow Firewall (if needed)
```bash
sudo ufw allow 8800
```

### Command 12: Get Your VPS IP Address
```bash
hostname -I
```
**The FIRST number is your VPS IP. Example output:**
```
123.45.67.89 10.0.0.1
                ^
         Save this one!
```

---

## SECTION 3: Verify Service is Running

Still in VPS, test:

### Test 1: Check Service Status
```bash
pm2 status
```
Should show: **online** in green

### Test 2: Check Logs
```bash
pm2 logs ai-quiz-service
```
Should show something like:
```
Starting Quiz Generation API server on http://0.0.0.0:8800
Debug mode: False
API Key configured: Yes
```

### Test 3: Test the Service
```bash
curl http://localhost:8800/health
```
Should return:
```json
{"status":"healthy","service":"Quiz Generation API","version":"1.0.0"}
```

### Test 4: Exit VPS
```bash
exit
```

---

## SECTION 4: Configure Main Website

Now on your **MAIN website server** (where puptquiz.com runs):

### Step 1: Edit .env
```bash
# Navigate to your website directory
cd ~/puptquiz

# Open .env file (use nano, vim, or any editor)
nano .env
```

### Step 2: Find and Replace This Line

**Find (around line 96):**
```
VITE_AI_SERVICE_URL=http://localhost:8800
```

**Replace with your VPS IP:**
```
VITE_AI_SERVICE_URL=http://123.45.67.89:8800
```
(Replace `123.45.67.89` with YOUR actual VPS IP from Section 2)

**Save:**
- If using nano: Press `Ctrl+X`, then `Y`, then `Enter`

### Step 3: Rebuild Frontend
```bash
npm run build
```
Wait 1-2 minutes

### Step 4: Verify Connection
```bash
curl http://123.45.67.89:8800/health
```
Should return JSON response

---

## SECTION 5: Test on Live Website

1. Open browser: https://puptquiz.com
2. Go to "Explore" or AI Quiz Generator
3. Try to generate a quiz
4. It should work! ✓

---

## If Something Goes Wrong

### Service Not Running?
```bash
# SSH back into VPS
ssh root@YOUR_VPS_IP

# Check what happened
pm2 logs ai-quiz-service

# Restart it
pm2 restart ai-quiz-service
```

### Can't Connect from Website?
```bash
# From your main server, test
curl http://YOUR_VPS_IP:8800/health

# If timeout or error:
# 1. Check VPS is running: pm2 status (in VPS)
# 2. Check firewall: sudo ufw status (in VPS)
# 3. Check port: netstat -tlnp | grep 8800 (in VPS)
```

### Website Still Shows Error?
```bash
# On main website server:
# 1. Check .env has correct IP
grep VITE_AI_SERVICE_URL .env

# 2. Rebuild if you changed .env
npm run build

# 3. Clear cache
php artisan config:cache
php artisan view:cache

# 4. Check logs
tail -f storage/logs/laravel.log
```

---

## Quick Reference

### VPS Connection
```bash
# Remember to replace YOUR_VPS_IP
ssh root@YOUR_VPS_IP
```

### Essential VPS Commands
```bash
# Check if service is running
pm2 status

# View logs
pm2 logs ai-quiz-service

# Restart service
pm2 restart ai-quiz-service

# Stop service
pm2 stop ai-quiz-service

# Test service
curl http://localhost:8800/health

# Get your IP
hostname -I
```

### Main Website Commands
```bash
# Check configuration
grep VITE_AI_SERVICE_URL .env

# Rebuild frontend
npm run build

# Test connection
curl http://YOUR_VPS_IP:8800/health
```

---

## Completion Checklist

- [ ] Connected to VPS via SSH
- [ ] Pulled latest code with git
- [ ] Created and activated Python virtual environment
- [ ] Installed all Python dependencies
- [ ] Installed Node.js and PM2
- [ ] Started service with PM2
- [ ] Set up PM2 auto-start
- [ ] Allowed port 8800 in firewall
- [ ] Got and saved VPS IP address
- [ ] Verified service is running (pm2 status = online)
- [ ] Updated main website .env with VPS IP
- [ ] Rebuilt frontend (npm run build)
- [ ] Tested connection (curl command)
- [ ] Tested on live website (https://puptquiz.com)

---

## Support

If you get stuck:
1. **Read:** VPS_SETUP_STEP_BY_STEP.md (detailed explanation)
2. **Check:** `pm2 logs ai-quiz-service` (see what went wrong)
3. **Restart:** `pm2 restart ai-quiz-service` (sometimes fixes it)
4. **Test:** `curl http://VPS_IP:8800/health` (verify service works)

You can do this! 🚀
