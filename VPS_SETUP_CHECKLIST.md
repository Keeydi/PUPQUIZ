# VPS Setup Checklist - Quick Reference

## Information You Need to Have Ready

Before starting, gather:
- [ ] VPS IP Address (from Hostinger email)
- [ ] VPS Password or SSH key
- [ ] Google API Key (already in .env)
- [ ] Your project path on VPS

---

## Phase 1: Connect to VPS (5 minutes)

### Windows Users - Using PowerShell

```powershell
# Step 1a: Open PowerShell as Administrator
# Start Menu → PowerShell → Run as Administrator

# Step 1b: Connect to VPS
ssh root@YOUR_VPS_IP
# When prompted, enter your VPS password

# You should see: root@vps-xxx:~#
```

### Mac/Linux Users

```bash
# Step 1: Open Terminal
# Step 2: Connect
ssh root@YOUR_VPS_IP
# When prompted, enter your VPS password
```

### Stuck? Troubleshooting Connection

| Problem | Solution |
|---------|----------|
| "Command not found: ssh" | Windows: Use PuTTY instead |
| "Connection refused" | Wrong VPS IP? Check Hostinger panel |
| "Permission denied" | Wrong password? Try again or reset in Hostinger |
| "Connection timeout" | Check your internet, or ask Hostinger support |

---

## Phase 2: Navigate & Pull Code (3 minutes)

```bash
# ✓ Step 2a: Find your project
cd ~/PUPQUIZ
# OR
cd /root/PUPQUIZ
# OR
cd /home/username/PUPQUIZ

# ✓ Step 2b: Verify you're in the right place
ls -la
# Should see: app.py, requirements.txt, venv (maybe)

# ✓ Step 2c: Pull latest code
git pull origin main
# Should show: Already up to date (or new files if we made changes)
```

---

## Phase 3: Python Setup (5 minutes)

```bash
# ✓ Step 3a: Create virtual environment
python3 -m venv venv
# Wait for completion (shows folder creation)

# ✓ Step 3b: Activate it
source venv/bin/activate
# Should see (venv) at the start of your prompt

# ✓ Step 3c: Install dependencies
pip install -r requirements.txt
# Wait 2-3 minutes for downloads

# ✓ Step 3d: Verify (optional)
python -c "import flask; print('Flask installed!')"
```

---

## Phase 4: Install PM2 (5 minutes)

```bash
# ✓ Step 4a: Check if Node.js exists
node --version
# If error, continue to 4b

# ✓ Step 4b: Install Node.js (if needed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
# Wait for completion

# ✓ Step 4c: Install PM2
npm install -g pm2
# Should show "added X packages"

# ✓ Step 4d: Verify
pm2 --version
# Should show version number
```

---

## Phase 5: Start Service with PM2 (2 minutes)

```bash
# ✓ Step 5a: Make sure you're in project directory
pwd
# Should end with: /PUPQUIZ

# ✓ Step 5b: Start the service
pm2 start app.py --name ai-quiz-service --interpreter python3
# Should show green "online" status

# ✓ Step 5c: Setup auto-start on reboot (IMPORTANT!)
pm2 startup
# Copy the entire command shown and paste it!

# ✓ Step 5d: Save configuration
pm2 save
# Should confirm saved

# ✓ Step 5e: Verify it's running
pm2 status
# Should show "online"
```

---

## Phase 6: Firewall Setup (1 minute)

```bash
# ✓ Step 6a: Check if firewall is active
sudo ufw status
# If says "inactive", skip to Phase 7
# If says "active", continue to 6b

# ✓ Step 6b: Allow port 8800
sudo ufw allow 8800
# Should show "Rules updated"

# ✓ Step 6c: Verify
sudo ufw status
# Should show "8800/tcp ALLOW" in the list
```

---

## Phase 7: Get Your VPS IP (1 minute) ⭐ IMPORTANT

```bash
# ✓ Step 7: Get your IP
hostname -I

# Output will be: 123.45.67.89 10.0.0.1
# The FIRST number (123.45.67.89) is your VPS IP - SAVE THIS!
```

**Copy this IP somewhere safe! You need it for the main website.**

---

## Phase 8: Verify Service Works (2 minutes)

```bash
# ✓ Step 8a: Test from VPS (while still connected)
curl http://localhost:8800/health

# Should return: {"status":"healthy",...}

# ✓ Step 8b: Check service logs
pm2 logs ai-quiz-service
# Should show startup messages

# ✓ Step 8c: Exit VPS (when done testing)
exit
# You're now back on your local computer
```

---

## Phase 9: Update Main Website (5 minutes)

**Now do this on your MAIN website server (where Laravel runs):**

```bash
# ✓ Step 9a: Navigate to your project
cd ~/puptquiz
# OR wherever your main website is

# ✓ Step 9b: Edit .env file
nano .env
# OR use your favorite editor

# ✓ Step 9c: Find this line (around line 96):
VITE_AI_SERVICE_URL=http://localhost:8800

# ✓ Step 9d: Change it to your VPS IP:
VITE_AI_SERVICE_URL=http://123.45.67.89:8800
# (Replace 123.45.67.89 with YOUR actual VPS IP)

# ✓ Step 9e: Save and exit (if using nano: Ctrl+X, then Y, then Enter)

# ✓ Step 9f: Rebuild frontend
npm run build
# Wait 1-2 minutes

# ✓ Step 9g: Verify connection
curl http://123.45.67.89:8800/health
# Should return the JSON response
```

---

## Phase 10: Test Everything (3 minutes)

1. **Visit your website:** https://puptquiz.com
2. **Navigate to AI Quiz Generator**
3. **Try to generate a quiz**
4. **It should work!** ✓

If it doesn't work, check:
- [ ] VPS service running: `pm2 status`
- [ ] Service has API key: Check `.env` on VPS
- [ ] Website points to VPS IP: Check `.env` on main server
- [ ] Firewall allows port 8800: `sudo ufw status`

---

## Total Time: ~30 minutes

| Phase | Time | Task |
|-------|------|------|
| 1 | 5 min | Connect to VPS |
| 2 | 3 min | Pull code |
| 3 | 5 min | Setup Python |
| 4 | 5 min | Install PM2 |
| 5 | 2 min | Start service |
| 6 | 1 min | Firewall |
| 7 | 1 min | Get VPS IP |
| 8 | 2 min | Verify |
| 9 | 5 min | Update website |
| 10 | 3 min | Test |

---

## Emergency Commands

If something goes wrong:

```bash
# Stop the service
pm2 stop ai-quiz-service

# Restart the service
pm2 restart ai-quiz-service

# View logs
pm2 logs ai-quiz-service

# Delete and restart
pm2 delete ai-quiz-service
pm2 start app.py --name ai-quiz-service --interpreter python3

# Check if port 8800 is in use
netstat -tlnp | grep 8800

# Kill process on port 8800
lsof -ti:8800 | xargs kill -9
```

---

## Need Help?

1. **Check logs:** `pm2 logs ai-quiz-service`
2. **Test connection:** `curl http://VPS_IP:8800/health`
3. **Restart service:** `pm2 restart ai-quiz-service`
4. **Read the detailed guide:** `VPS_PRODUCTION_SETUP.md`

Good luck! You've got this! 🚀
