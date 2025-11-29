# 🚨 IMPORTANT - Read This First!

## What You Did Wrong

You tried to run `bash setup_vps.sh` on your **local computer**.

The error you got:
```
✗ This script must be run as root (use: sudo bash setup_vps.sh)
```

## What You Should Do

The script needs to run **on your VPS server** (not locally).

---

## 🎯 The Correct Process

```
STEP 1: SSH to VPS (from your local computer)
         ↓
STEP 2: You're now INSIDE the VPS
         ↓
STEP 3: Run the setup script ON THE VPS
         ↓
STEP 4: Wait for completion
         ↓
STEP 5: Exit VPS
         ↓
STEP 6: Update website config (on local computer)
         ↓
STEP 7: Done!
```

---

## 📍 Where to Run Commands

### Local Computer (Your Machine)
```powershell
C:\Users\Administrator> ssh root@72.61.209.163
C:\Users\Administrator> cd ~/puptquiz
C:\Users\Administrator> npm run build
```

### VPS Server (After SSH)
```bash
root@vps-xxxx:~# cd PUPQUIZ
root@vps-xxxx:~# bash setup_vps.sh
root@vps-xxxx:~# exit
```

---

## ⚡ Quick Start - Do This Now

### 1. Open PowerShell
- Press: `Windows Key + R`
- Type: `powershell`
- Press: `Enter`

### 2. SSH to VPS
```powershell
ssh root@72.61.209.163
```
- Type: `yes`
- Password: `WOLhxiAgPssTz3CUsO;7`

### 3. Run Setup (on VPS)
```bash
cd PUPQUIZ && bash setup_vps.sh
```
- Wait 5-10 minutes

### 4. Exit VPS
```bash
exit
```

### 5. Update Website
```bash
cd ~/puptquiz && nano .env
```
- Change: `VITE_AI_SERVICE_URL=http://72.61.209.163:8800`
- Save: `Ctrl+X, Y, Enter`

### 6. Rebuild
```bash
npm run build
```

### 7. Test
```bash
curl http://72.61.209.163:8800/health
```

---

## ✅ Complete Step-by-Step Guide

For detailed instructions, open:
→ **`EXACT_STEPS_TO_FOLLOW.md`**

It has all 12 steps with explanations.

---

## 🚀 Start Now!

1. Open: `EXACT_STEPS_TO_FOLLOW.md`
2. Follow each step carefully
3. In 15 minutes you're done!

---

**Let's go! 🚀**
