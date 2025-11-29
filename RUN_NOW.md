# ⚡ AUTOMATED SETUP - Execute Right Now

## Your Setup in 3 Steps

### ✅ STEP 1: Connect to VPS (1 minute)

**In your PowerShell/CMD window, paste this:**

```powershell
ssh root@72.61.209.163
```

**Press Enter**

You'll see:
```
The authenticity of host '72.61.209.163' cannot be established.
Are you sure you want to continue connecting (yes/no)?
```

Type: `yes` and press Enter

Then paste your password:
```
WOLhxiAgPssTz3CUsO;7
```

Press Enter

**You should see:**
```
root@vps-xxxx:~#
```

---

### ✅ STEP 2: Run Automated Setup (5-10 minutes)

Once connected to VPS, paste this command:

```bash
cd ~/PUPQUIZ && bash setup_vps.sh
```

**Press Enter**

**Wait for it to complete.** You'll see green checkmarks:

```
✓ Project directory: /root/PUPQUIZ
✓ Code updated
✓ Virtual environment activated
✓ Dependencies installed
✓ Service is online
✓ Port 8800 allowed
✓ Setup completed successfully! 🎉
```

**At the end, note the Service URL shown:**
```
Service URL: http://72.61.209.163:8800
```

---

### ✅ STEP 3: Update Website & Test (5 minutes)

Type this to exit VPS:
```bash
exit
```

**Press Enter**

Now update your main website (on your main server):

```bash
cd ~/puptquiz
nano .env
```

Find and change:
```
FROM: VITE_AI_SERVICE_URL=http://localhost:8800
TO:   VITE_AI_SERVICE_URL=http://72.61.209.163:8800
```

Save: `Ctrl+X` → `Y` → `Enter`

Then rebuild:
```bash
npm run build
```

Test:
```bash
curl http://72.61.209.163:8800/health
```

Should return JSON with `"status":"healthy"`

---

## 🎉 Done!

Visit: **https://puptquiz.com**
Try: **Generate a quiz**
Result: **It works!** ✓

---

## 📝 Full Commands (Copy & Paste)

```powershell
# Step 1: SSH to VPS
ssh root@72.61.209.163
# Password: WOLhxiAgPssTz3CUsO;7

# Step 2: Run setup (wait 5-10 min)
cd ~/PUPQUIZ && bash setup_vps.sh

# Step 3: Exit VPS
exit

# Step 4: Update website (on your main server)
cd ~/puptquiz
nano .env
# Change: VITE_AI_SERVICE_URL=http://72.61.209.163:8800
# Save: Ctrl+X, Y, Enter

# Step 5: Rebuild
npm run build

# Step 6: Test
curl http://72.61.209.163:8800/health
```

---

## ⏱️ Timeline

```
SSH Connect:        1 minute
Automated Setup:    5-10 minutes
Update Website:     2 minutes
Rebuild:           1-2 minutes
Test:              1 minute
━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:             10-16 minutes ✓
```

---

## ✅ Success Checklist

- [ ] SSH connected to VPS
- [ ] Setup script ran completely
- [ ] Saw "Setup completed successfully! 🎉"
- [ ] Exited VPS
- [ ] Updated website .env
- [ ] Ran npm run build
- [ ] Curl test returned JSON
- [ ] Visited puptquiz.com
- [ ] Generated a quiz
- [ ] No "Failed to fetch" error ✓

---

## 🆘 If Something Goes Wrong

### SSH Connection Error

**Error:** "ssh: command not found"

**Solution:** Use PuTTY
1. Download: https://www.putty.org/
2. Run PuTTY
3. Host: `72.61.209.163`
4. Port: `22`
5. Click Open
6. Login as: `root`
7. Password: `WOLhxiAgPssTz3CUsO;7`

### Setup Script Error

**If script fails, run manually:**

```bash
cd ~/PUPQUIZ
git pull origin main
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
npm install -g pm2
pm2 start app.py --name ai-quiz-service --interpreter python3
pm2 startup
pm2 save
sudo ufw allow 8800
pm2 status
```

### Connection Test Failed

```bash
# From VPS
curl http://localhost:8800/health

# From main server
curl http://72.61.209.163:8800/health

# Check PM2 status
pm2 status
pm2 logs ai-quiz-service
```

---

## 🚀 You're Ready!

Everything is set up. Just follow the 3 steps above and you're done!

**Total time: ~15 minutes**

Good luck! 🎉
