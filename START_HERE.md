# 🚀 PUPQUIZ VPS Setup - Your Personalized Setup Guide

## Your VPS Credentials

```
VPS IP:        72.61.209.163
VPS Username:  root
VPS Password:  WOLhxiAgPssTz3CUsO;7
Admin Login:   admin / Puptcqbs#234
```

**⚠️ Keep these credentials safe and secure!**

---

## 📚 Available Setup Methods

### Method 1: ⭐ Automated Script (Recommended)
**Fastest - Runs everything automatically**

```bash
# SSH into VPS
ssh root@72.61.209.163
# Password: WOLhxiAgPssTz3CUsO;7

# Run the automated setup
bash setup_vps.sh
```

**Time:** ~5 minutes
**Best for:** Quick setup without worrying about individual steps

---

### Method 2: Manual Step-by-Step
**Most Control - Follow detailed instructions**

Follow: **QUICK_START_WITH_CREDENTIALS.md**
- Copy & paste commands one by one
- See what happens at each step
- Good for understanding the process

**Time:** ~20 minutes
**Best for:** Learning and understanding each step

---

### Method 3: Detailed Guide
**Most Learning - Read explanations first**

Follow: **VPS_SETUP_YOUR_CREDENTIALS.md**
- Explains what each step does
- Includes troubleshooting
- Best for learning

**Time:** ~30 minutes
**Best for:** Understanding everything in detail

---

## 🎯 Quick Start (Recommended)

### 1️⃣ SSH into VPS
```bash
ssh root@72.61.209.163
```
Password: `WOLhxiAgPssTz3CUsO;7`

### 2️⃣ Run Automated Setup
```bash
bash setup_vps.sh
```
Wait for completion (~5 minutes)

### 3️⃣ Note Your VPS IP
The script will show:
```
VPS IP: 72.61.209.163
Service URL: http://72.61.209.163:8800
```

### 4️⃣ Update Main Website
On your main website server:

```bash
# Edit .env
nano .env

# Change this line:
VITE_AI_SERVICE_URL=http://72.61.209.163:8800

# Rebuild frontend
npm run build
```

### 5️⃣ Test
Visit: https://puptquiz.com
Try generating a quiz - it should work! ✓

---

## 📋 What Gets Installed

The automated script (or manual steps) will:

✅ Clone/update your project from GitHub
✅ Create Python virtual environment
✅ Install Python dependencies (Flask, Google AI, etc.)
✅ Install Node.js (if needed)
✅ Install PM2 process manager
✅ Start your Python AI service
✅ Configure auto-start on reboot
✅ Open firewall port 8800
✅ Verify everything works

**Result:** Your AI service runs 24/7! 🎉

---

## 🔍 How to Verify It Works

### From VPS:
```bash
ssh root@72.61.209.163

# Check service status
pm2 status
# Should show: online ✓

# Check logs
pm2 logs ai-quiz-service
# Should show startup messages

# Test service
curl http://localhost:8800/health
# Should return: {"status":"healthy",...}
```

### From Main Website Server:
```bash
# Test connection
curl http://72.61.209.163:8800/health
# Should return JSON response

# Check website configuration
grep VITE_AI_SERVICE_URL .env
# Should show: http://72.61.209.163:8800
```

### From Browser:
1. Go to: https://puptquiz.com
2. Click on "Explore" or "AI Quiz Generator"
3. Try to generate a quiz
4. Should work without "Failed to fetch" error

---

## 📁 Important Files in Project

**VPS Setup Files:**
- `setup_vps.sh` - Automated setup script
- `QUICK_START_WITH_CREDENTIALS.md` - Quick copy-paste guide
- `VPS_SETUP_YOUR_CREDENTIALS.md` - Detailed with your credentials
- `VPS_SETUP_STEP_BY_STEP.md` - Step-by-step with explanations
- `VPS_SETUP_CHECKLIST.md` - Checklist format

**Configuration Files:**
- `.env` - Environment variables (includes API key)
- `app.py` - Python Flask app (updated for production)
- `requirements.txt` - Python dependencies
- `ecosystem.config.js` - PM2 configuration

---

## 🆘 Troubleshooting

### Problem: Service won't start
```bash
ssh root@72.61.209.163
pm2 logs ai-quiz-service
# Check error message
pm2 restart ai-quiz-service
```

### Problem: Can't connect from website
```bash
# Verify service is running
pm2 status

# Test from VPS
curl http://localhost:8800/health

# Test from website server
curl http://72.61.209.163:8800/health

# Check website .env has correct IP
grep VITE_AI_SERVICE_URL .env
```

### Problem: Service crashes after restart
```bash
# Check what happened
pm2 logs ai-quiz-service

# Verify PM2 startup is configured
pm2 startup
pm2 save

# Restart
pm2 restart ai-quiz-service
```

---

## 📞 Useful Commands to Remember

```bash
# SSH into VPS
ssh root@72.61.209.163

# Check service status
pm2 status

# View logs
pm2 logs ai-quiz-service

# Restart service
pm2 restart ai-quiz-service

# Stop service
pm2 stop ai-quiz-service

# Start service
pm2 start app.py --name ai-quiz-service --interpreter python3

# Test service
curl http://localhost:8800/health

# Check firewall
sudo ufw status

# Allow port
sudo ufw allow 8800

# Exit VPS
exit
```

---

## ⏱️ Timeline

| Action | Time |
|--------|------|
| SSH connect | 1 min |
| Automated setup (setup_vps.sh) | 5 min |
| Manual setup (if preferred) | 20 min |
| Update website | 5 min |
| Test | 2 min |
| **Total** | **~15-30 min** |

---

## ✅ Success Checklist

After completing setup:

- [ ] Can SSH into VPS (root@72.61.209.163)
- [ ] Service shows "online" (pm2 status)
- [ ] Health check works (curl http://localhost:8800/health)
- [ ] Firewall allows port 8800 (sudo ufw status)
- [ ] Website .env has correct URL (http://72.61.209.163:8800)
- [ ] Website rebuilt (npm run build)
- [ ] Can generate quiz on website (no "Failed to fetch" error)

---

## 🎉 After Setup

Your AI quiz generator will:

✅ Run 24/7 on your VPS
✅ Automatically restart if it crashes
✅ Automatically start after VPS reboot
✅ Generate quizzes using Google's Gemini AI
✅ Serve students with unlimited quiz generation

---

## 🚀 Ready to Start?

### Choose Your Path:

**Fast Path (Recommended):**
1. SSH: `ssh root@72.61.209.163`
2. Run: `bash setup_vps.sh`
3. Update website .env with: `http://72.61.209.163:8800`
4. Test on website

**Manual Path:**
1. Follow: `QUICK_START_WITH_CREDENTIALS.md`
2. Copy & paste commands one by one
3. Update website .env
4. Test on website

**Learning Path:**
1. Read: `VPS_SETUP_YOUR_CREDENTIALS.md`
2. Follow detailed instructions
3. Update website .env
4. Test on website

---

## 📝 Keep This Safe

```
VPS IP:        72.61.209.163
Username:      root
Password:      WOLhxiAgPssTz3CUsO;7
Service URL:   http://72.61.209.163:8800
Admin Login:   admin / Puptcqbs#234
```

---

## Need Help?

1. Check the logs: `pm2 logs ai-quiz-service`
2. Read the troubleshooting section above
3. Test the service: `curl http://72.61.209.163:8800/health`
4. Restart if needed: `pm2 restart ai-quiz-service`

---

**You've got this! Let's make your AI quiz generator live! 🚀**

Once you complete setup, students can generate unlimited quizzes using AI!

Good luck! 🎉
