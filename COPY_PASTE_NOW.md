# 🚀 READY TO GO - Copy These Commands

## Your 3 Simple Steps

### 1️⃣ Connect to VPS

Copy this and paste in PowerShell:

```powershell
ssh root@72.61.209.163
```

Password: `WOLhxiAgPssTz3CUsO;7`

---

### 2️⃣ Run Automated Setup

After connected, paste this:

```bash
cd ~/PUPQUIZ && bash setup_vps.sh
```

Wait 5-10 minutes for completion ✓

---

### 3️⃣ Update Website

After setup completes, type `exit` to leave VPS

Then on your main website server:

```bash
cd ~/puptquiz
nano .env
```

Find this line:
```
VITE_AI_SERVICE_URL=http://localhost:8800
```

Change it to:
```
VITE_AI_SERVICE_URL=http://72.61.209.163:8800
```

Save: `Ctrl+X` → `Y` → `Enter`

Rebuild:
```bash
npm run build
```

---

## 🎯 That's It!

Visit **https://puptquiz.com** and try generating a quiz.

It should work! ✓

---

## 📋 Commands Quick Reference

```
# SSH Connect
ssh root@72.61.209.163

# Run Setup
cd ~/PUPQUIZ && bash setup_vps.sh

# Exit VPS
exit

# Update Website
nano .env
# Change: VITE_AI_SERVICE_URL=http://72.61.209.163:8800

# Rebuild Website
npm run build

# Test
curl http://72.61.209.163:8800/health
```

---

**Total time: 15 minutes. Go! 🚀**
