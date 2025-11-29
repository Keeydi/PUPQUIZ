# VPS Setup - Visual Quick Start

## Your Setup Details

```
┌─────────────────────────────────────────┐
│          YOUR VPS INFORMATION           │
├─────────────────────────────────────────┤
│ IP Address:  72.61.209.163              │
│ Username:    root                       │
│ Password:    WOLhxiAgPssTz3CUsO;7       │
│ Port:        8800 (for Python service)  │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Start Flow

```
1. SSH INTO VPS
   ssh root@72.61.209.163
   Password: WOLhxiAgPssTz3CUsO;7
        ↓
2. SETUP PYTHON
   cd ~/PUPQUIZ
   git pull origin main
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
        ↓
3. INSTALL PM2
   npm install -g pm2
        ↓
4. START SERVICE
   pm2 start app.py --name ai-quiz-service --interpreter python3
   pm2 startup && pm2 save
        ↓
5. OPEN FIREWALL
   sudo ufw allow 8800
        ↓
6. VERIFY
   pm2 status (should show: online)
   curl http://localhost:8800/health
        ↓
7. EXIT VPS
   exit
        ↓
8. UPDATE MAIN WEBSITE
   .env: VITE_AI_SERVICE_URL=http://72.61.209.163:8800
   npm run build
        ↓
9. TEST
   Visit https://puptquiz.com
   Try generating a quiz
        ↓
   ✅ DONE! AI Quiz Generator Working!
```

---

## 📋 Commands to Copy & Paste

### Part 1: Connect to VPS & Setup (10 minutes)

```bash
# STEP 1: Connect to VPS
ssh root@72.61.209.163
# Paste password when asked: WOLhxiAgPssTz3CUsO;7

# STEP 2: Navigate to project
cd ~/PUPQUIZ

# STEP 3: Pull latest code
git pull origin main

# STEP 4: Create virtual environment
python3 -m venv venv

# STEP 5: Activate it
source venv/bin/activate

# STEP 6: Install Python packages (wait 2-3 min)
pip install -r requirements.txt

# STEP 7: Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# STEP 8: Install PM2
npm install -g pm2

# STEP 9: Start the service
pm2 start app.py --name ai-quiz-service --interpreter python3

# STEP 10: Setup auto-start
pm2 startup
# Copy the command it shows and paste it

# STEP 11: Save configuration
pm2 save

# STEP 12: Verify service is running
pm2 status
# Should show: online ✓

# STEP 13: Check logs
pm2 logs ai-quiz-service
# Press Ctrl+C to exit

# STEP 14: Allow firewall
sudo ufw allow 8800

# STEP 15: Test from VPS
curl http://localhost:8800/health
# Should return: {"status":"healthy",...}

# STEP 16: Exit VPS
exit
```

### Part 2: Update Main Website (5 minutes)

On your **main website server** (not VPS), run:

```bash
# Navigate to website
cd ~/puptquiz

# Edit .env file
nano .env

# Find and replace this line:
# FROM: VITE_AI_SERVICE_URL=http://localhost:8800
# TO:   VITE_AI_SERVICE_URL=http://72.61.209.163:8800

# Save: Ctrl+X → Y → Enter

# Rebuild frontend
npm run build

# Test connection
curl http://72.61.209.163:8800/health

# Should return: {"status":"healthy",...} ✓
```

---

## ✅ Verification Checklist

After completing all steps, verify:

```bash
# From VPS:
pm2 status           # ✓ Should show: online
pm2 logs             # ✓ Should show startup messages

# From main server:
curl http://72.61.209.163:8800/health  # ✓ Should return JSON
grep VITE_AI_SERVICE_URL .env           # ✓ Should show your VPS IP

# From browser:
https://puptquiz.com                    # ✓ Try generating a quiz
```

---

## 🔧 Troubleshooting Commands

If something doesn't work, run these:

```bash
# Check if service is running
ssh root@72.61.209.163
pm2 status

# View error logs
pm2 logs ai-quiz-service

# Restart service
pm2 restart ai-quiz-service

# Check if port is open
netstat -tlnp | grep 8800

# Check firewall
sudo ufw status

# Test connection
curl http://localhost:8800/health
```

---

## 📞 Support

| Issue | Check This |
|-------|-----------|
| "Can't connect" | `pm2 status` and `pm2 logs ai-quiz-service` |
| "Connection timeout" | `sudo ufw status` and check if port 8800 is allowed |
| "Service offline" | `pm2 logs ai-quiz-service` to see error, then `pm2 restart ai-quiz-service` |
| "Quiz generator not working" | Check `.env` has correct `VITE_AI_SERVICE_URL=http://72.61.209.163:8800` |

---

## ⏱️ Estimated Time

- Connect & setup Python: 10 minutes
- Install PM2 & start: 3 minutes
- Update website: 5 minutes
- Test: 2 minutes

**Total: ~20 minutes**

---

## 🎯 Success Indicators

You've done it right when:

1. ✅ `pm2 status` shows "online"
2. ✅ `curl http://localhost:8800/health` returns JSON
3. ✅ Website `.env` has correct IP: `http://72.61.209.163:8800`
4. ✅ Website `npm run build` completes
5. ✅ Website quiz generator works without "Failed to fetch" error

---

Good luck! 🚀

Once you complete these steps, your AI quiz generator will be live!

Need help? Check:
- VPS_SETUP_YOUR_CREDENTIALS.md (detailed)
- VPS_SETUP_STEP_BY_STEP.md (explanations)
- VPS_SETUP_CHECKLIST.md (progress tracking)
