# 🎬 ACTION TIME - Follow These 5 Steps

## The 5-Step Deployment

```
STEP 1: SSH to VPS (1 min)
   ↓
STEP 2: Run Automated Setup (5-10 min)
   ↓
STEP 3: Exit VPS (<1 min)
   ↓
STEP 4: Update Website Config (2 min)
   ↓
STEP 5: Rebuild Website (1-2 min)
   ↓
✅ LIVE! Your AI quiz generator works!
```

---

## Step 1️⃣ : SSH to VPS

**Open PowerShell and paste:**

```powershell
ssh root@72.61.209.163
```

**Press Enter**

**When asked "Are you sure you want to continue?":**
- Type: `yes`
- Press: `Enter`

**When asked for password:**
- Paste: `WOLhxiAgPssTz3CUsO;7`
- Press: `Enter`

**Success:** You see `root@vps-xxxx:~#`

---

## Step 2️⃣ : Run Automated Setup

**In VPS terminal, paste:**

```bash
cd ~/PUPQUIZ && bash setup_vps.sh
```

**Press Enter**

**Wait 5-10 minutes** - You'll see:

```
✓ Project directory
✓ Code updated
✓ Virtual environment created
✓ Dependencies installed
✓ PM2 installed
✓ Service started
✓ Service online
✓ Port allowed
✓ Setup completed successfully! 🎉
```

**When you see the checkmarks, it's working!**

---

## Step 3️⃣ : Exit VPS

**Type:**

```bash
exit
```

**Press Enter**

You're back to your computer.

---

## Step 4️⃣ : Update Website

**On your main website server, paste:**

```bash
cd ~/puptquiz && nano .env
```

**Press Enter**

**In the editor:**

1. Press `Ctrl+F` (or `Ctrl+W`) to search
2. Search for: `VITE_AI_SERVICE_URL`
3. Find this line: `VITE_AI_SERVICE_URL=http://localhost:8800`
4. Change it to: `VITE_AI_SERVICE_URL=http://72.61.209.163:8800`

**Save:**
- Press: `Ctrl+X`
- Type: `Y`
- Press: `Enter`

---

## Step 5️⃣ : Rebuild Website

**Paste:**

```bash
npm run build
```

**Press Enter**

Wait 1-2 minutes for completion.

You're done!

---

## 🎉 Verify It Works

Visit: **https://puptquiz.com**

1. Click: "Explore" or "AI Quiz Generator"
2. Select: A topic (e.g., "Mathematics")
3. Click: "Generate Quiz"
4. Wait: 5-10 seconds
5. See: Quiz with questions!

**If you see questions, SUCCESS!** ✓

---

## ✅ Timeline

```
Step 1 (SSH):          1 minute
Step 2 (Setup):        5-10 minutes
Step 3 (Exit):         < 1 minute
Step 4 (Update):       2 minutes
Step 5 (Build):        1-2 minutes
━━━━━━━━━━━━━━━━━━━
TOTAL:                 10-16 minutes
```

---

## 🆘 Troubleshooting

### Problem: SSH says "command not found"
**Solution:** Use PuTTY instead
- Download: https://www.putty.org/
- Host: 72.61.209.163
- Username: root
- Password: WOLhxiAgPssTz3CUsO;7

### Problem: Setup script fails
**Solution:** Check logs
```bash
pm2 logs ai-quiz-service
```

### Problem: Website still says "Failed to fetch"
**Solution:** Verify configuration
```bash
# Check website has correct URL
grep VITE_AI_SERVICE_URL .env

# Test service is running
curl http://72.61.209.163:8800/health
```

---

## 📝 All 5 Commands

```powershell
# 1. SSH (paste in PowerShell)
ssh root@72.61.209.163

# 2. Setup (type yes, paste password, then:)
cd ~/PUPQUIZ && bash setup_vps.sh

# 3. Exit
exit

# 4. Update website (on your website server)
cd ~/puptquiz && nano .env
# Change: VITE_AI_SERVICE_URL=http://72.61.209.163:8800

# 5. Build
npm run build
```

---

## 🎯 You're Almost There!

**Just follow the 5 steps above.**

That's it!

**In about 15 minutes, your AI quiz generator will be live!**

🚀 **Go! Execute now!**
