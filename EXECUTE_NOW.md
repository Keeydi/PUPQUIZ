# 🎯 START HERE - Execute Automated Setup

## What You're About to Do

```
Your Computer
    ↓
SSH to VPS (72.61.209.163)
    ↓
Run: bash setup_vps.sh
    ↓
Everything installs automatically
    ↓
Update website .env
    ↓
Test on website
    ↓
✅ Done! AI service is live!
```

---

## 🚀 Execute Now

### Copy & Paste Section 1: Connect to VPS

Open PowerShell and paste:

```powershell
ssh root@72.61.209.163
```

**Then:**
- Type: `yes`
- Paste password: `WOLhxiAgPssTz3CUsO;7`
- Press: `Enter`

**You should see:**
```
root@vps-xxxx:~#
```

---

### Copy & Paste Section 2: Run Setup

Paste this:

```bash
cd ~/PUPQUIZ && bash setup_vps.sh
```

**Then:**
- Press: `Enter`
- Wait: 5-10 minutes
- Watch for: Green checkmarks ✓

**You should see at the end:**
```
✓ Setup completed successfully! 🎉

Service URL: http://72.61.209.163:8800
Status: Online
```

---

### Copy & Paste Section 3: Exit VPS

Paste:

```bash
exit
```

Press: `Enter`

---

### Copy & Paste Section 4: Update Website

**On your main website server:**

Paste:

```bash
cd ~/puptquiz && nano .env
```

**Then:**

Find this line (use Ctrl+F to search):
```
VITE_AI_SERVICE_URL=http://localhost:8800
```

**Delete it and paste:**
```
VITE_AI_SERVICE_URL=http://72.61.209.163:8800
```

**Then:**
- Press: `Ctrl+X`
- Type: `Y`
- Press: `Enter`

---

### Copy & Paste Section 5: Rebuild

Paste:

```bash
npm run build
```

Press: `Enter`

Wait for completion (1-2 minutes)

---

### Copy & Paste Section 6: Test

Paste:

```bash
curl http://72.61.209.163:8800/health
```

Press: `Enter`

**You should see:**
```json
{"status":"healthy","service":"Quiz Generation API","version":"1.0.0"}
```

---

### Copy & Paste Section 7: Test on Website

1. Open browser
2. Visit: `https://puptquiz.com`
3. Click: `Explore` or `AI Quiz Generator`
4. Select: A topic
5. Click: `Generate Quiz`
6. Wait: 5-10 seconds
7. See: Quiz with questions! ✓

---

## ⏱️ Total Time: ~15 Minutes

```
Connect:    1 min
Setup:      5-10 min
Exit:       < 1 min
Update:     2 min
Rebuild:    1-2 min
Test:       1 min
━━━━━━━━━━━━━━━━━
Total:      ~15 min
```

---

## ✅ Success Looks Like

```
✓ Connected to VPS via SSH
✓ Setup script completed with green checkmarks
✓ Website .env updated
✓ npm run build completed
✓ curl command returned JSON
✓ Website quiz generator works
✓ No "Failed to fetch" errors
```

---

## 🆘 Stuck?

### SSH not working?
Use PuTTY: https://www.putty.org/
- Host: `72.61.209.163`
- User: `root`
- Password: `WOLhxiAgPssTz3CUsO;7`

### Setup script failed?
Check logs:
```bash
pm2 logs ai-quiz-service
```

### Website not connecting?
Verify:
```bash
# From VPS
curl http://localhost:8800/health

# From website server
curl http://72.61.209.163:8800/health

# Check .env
grep VITE_AI_SERVICE_URL .env
```

---

## 📋 All Commands in One Place

```bash
# 1. Connect to VPS
ssh root@72.61.209.163
# Password: WOLhxiAgPssTz3CUsO;7

# 2. Run setup (wait 5-10 min)
cd ~/PUPQUIZ && bash setup_vps.sh

# 3. Exit VPS
exit

# 4. Update website
cd ~/puptquiz && nano .env
# Change: VITE_AI_SERVICE_URL=http://72.61.209.163:8800
# Save: Ctrl+X, Y, Enter

# 5. Rebuild
npm run build

# 6. Test
curl http://72.61.209.163:8800/health

# 7. Visit website
# https://puptquiz.com
```

---

## 🎉 You're Ready!

**Everything is set up and waiting.**

Just follow the copy-paste sections above.

**In 15 minutes, your AI quiz generator will be live!**

Let's go! 🚀
