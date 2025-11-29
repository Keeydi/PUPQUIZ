# 📚 COMPLETE BEGINNER'S GUIDE - Start to Finish

## What You're About to Do

You have:
- A website running on Hostinger (puptquiz.com)
- A VPS on Hostinger (separate server for Python AI service)
- Need to connect them so quiz generation works

This guide walks you through everything step-by-step!

---

## 🎯 Part 1: Access Your Hostinger VPS via SSH

### What is SSH?
SSH (Secure Shell) is a safe way to connect to your VPS from your computer. It's like remote access but text-based.

### Step 1a: Check Your VPS is Active

1. Go to: **https://hpanel.hostinger.com/**
2. Log in with your Hostinger account
3. Look for "VPS" or "Cloud" section in the left menu
4. Find your VPS (should show as "active" in green)

### Step 1b: Find Your VPS Details

On the VPS page, you should see:
- **IP Address:** Should be `72.61.209.163` ✓
- **Username:** Should be `root` ✓
- **Status:** Should show "Active" (green) ✓

If you can't find the password, look for:
- "Reset Password" button
- SSH Keys section
- Or check your Hostinger email for credentials

Your password is: `WOLhxiAgPssTz3CUsO;7`

---

## 🎯 Part 2: Open PowerShell (Windows Terminal)

### Step 2a: Open PowerShell

**Windows 10/11:**

1. Press: **Windows Key + R** (opens "Run" dialog)
2. Type: `powershell`
3. Press: **Enter**

You should see:
```
Windows PowerShell
Copyright (C) Microsoft Corporation.

PS C:\Users\Administrator>
```

This is PowerShell - a terminal for commands.

---

## 🎯 Part 3: Connect to Your VPS via SSH

### Step 3a: Type SSH Command

In PowerShell, paste this:

```powershell
ssh root@72.61.209.163
```

Press: **Enter**

You'll see something like:
```
The authenticity of host '72.61.209.163 (72.61.209.163)' can't be established.
RSA key fingerprint is ...
Are you sure you want to continue connecting (yes/no)?
```

### Step 3b: Answer Yes

Type: **`yes`**

Press: **Enter**

You'll see:
```
Warning: Permanently added '72.61.209.163' (RSA) to the list of known hosts.
root@72.61.209.163's password:
```

### Step 3c: Enter Password

Now it asks for password (you won't see characters as you type):

Paste: **`WOLhxiAgPssTz3CUsO;7`**

Press: **Enter**

### Step 3d: Success!

You should now see:
```
root@vps-xxxx:~#
```

**You are now INSIDE your VPS!** 🎉

---

## 🎯 Part 4: Navigate to Your Project

### Step 4a: Check Where You Are

Type:
```bash
pwd
```

Press: **Enter**

You should see:
```
/root
```

This means you're in the home directory.

### Step 4b: Navigate to PUPQUIZ Folder

Type:
```bash
cd PUPQUIZ
```

Press: **Enter**

### Step 4c: Verify Files Are There

Type:
```bash
ls -la
```

Press: **Enter**

You should see files like:
```
app.py
setup_vps.sh
requirements.txt
.env
```

If you don't see these files, the project isn't cloned yet. Contact support.

---

## 🎯 Part 5: Run the Automated Setup

### Step 5a: Start the Setup Script

Type:
```bash
bash setup_vps.sh
```

Press: **Enter**

You should see:
```
==========================================
PUPQUIZ AI Service - VPS Setup Script
==========================================

→ Navigating to project directory...
✓ Project directory: /root/PUPQUIZ
→ Pulling latest code from GitHub...
✓ Code updated
```

### Step 5b: Wait for Completion

**This will take 5-10 minutes.** Watch the terminal for green checkmarks (✓):

```
✓ Python 3 found
✓ Virtual environment created
✓ Dependencies installed
✓ Node.js found
✓ PM2 installed
✓ Service started
✓ Service is online
✓ Port 8800 allowed
✓ Setup completed successfully! 🎉
```

**Don't close the terminal while it's running!**

### Step 5c: Note the Output

At the end, you should see:
```
Your Service Information:
  Service Name: ai-quiz-service
  Service URL: http://72.61.209.163:8800
  Status: Online
```

**Save this URL!** You'll need it in the next section.

---

## 🎯 Part 6: Exit the VPS

### Step 6a: Disconnect from VPS

Type:
```bash
exit
```

Press: **Enter**

You should see:
```
PS C:\Users\Administrator>
```

You're back on your local computer!

---

## 🎯 Part 7: Update Your Main Website

Now you need to tell your main website where to find the Python service.

### Step 7a: Navigate to Website Directory

Type:
```bash
cd ~/puptquiz
```

Or if that doesn't work:
```bash
cd C:\path\to\puptquiz
```

Press: **Enter**

### Step 7b: Edit the .env File

Type:
```bash
nano .env
```

Press: **Enter**

A text editor will open showing your configuration file.

### Step 7c: Find the Line to Change

Look for this line (should be around line 96):
```
VITE_AI_SERVICE_URL=http://localhost:8800
```

### Step 7d: Edit the Line

1. Use arrow keys to navigate to that line
2. Delete the old URL: `http://localhost:8800`
3. Type the new URL: `http://72.61.209.163:8800`

**Result should be:**
```
VITE_AI_SERVICE_URL=http://72.61.209.163:8800
```

### Step 7e: Save the File

Press: **Ctrl + X** (exit editor)

It will ask:
```
Save modified buffer (ANSWERING "No" will DISCARD changes)?
```

Type: **`Y`** (yes)

Press: **Enter**

It will ask:
```
File Name to Write: .env
```

Press: **Enter** (keep the same filename)

You should be back to the command prompt.

---

## 🎯 Part 8: Rebuild Your Website

### Step 8a: Install Dependencies (if needed)

Type:
```bash
npm install
```

Press: **Enter**

Wait for completion (1-2 minutes).

### Step 8b: Build Frontend

Type:
```bash
npm run build
```

Press: **Enter**

Wait for completion (2-3 minutes). You should see:
```
✓ built in XXs
```

---

## 🎯 Part 9: Test the Connection

### Step 9a: Test from Command Line

Type:
```bash
curl http://72.61.209.163:8800/health
```

Press: **Enter**

You should see:
```json
{"status":"healthy","service":"Quiz Generation API","version":"1.0.0"}
```

If you see this, **the connection works!** ✓

### Step 9b: Test on Your Website

1. Open a web browser
2. Go to: **https://puptquiz.com**
3. Click: **"Explore"** or **"AI Quiz Generator"**
4. Select a topic (e.g., "Mathematics")
5. Click: **"Generate Quiz"**
6. Wait 5-10 seconds
7. You should see quiz questions! ✓

---

## 🎉 SUCCESS!

If you see quiz questions on your website, **it works!**

Your AI quiz generator is now live!

---

## 📋 Complete Command Summary

Here are all the commands in order:

```powershell
# 1. Open PowerShell
# Press: Windows Key + R
# Type: powershell
# Press: Enter

# 2. SSH to VPS
ssh root@72.61.209.163
# Type: yes
# Password: WOLhxiAgPssTz3CUsO;7

# 3. Navigate to project (on VPS)
cd PUPQUIZ

# 4. Verify files (on VPS)
ls -la

# 5. Run automated setup (on VPS, wait 5-10 min)
bash setup_vps.sh

# 6. Exit VPS
exit

# 7. Go to website directory (on local)
cd ~/puptquiz

# 8. Edit configuration
nano .env
# Change: VITE_AI_SERVICE_URL=http://72.61.209.163:8800
# Save: Ctrl+X, Y, Enter

# 9. Install and build (on local)
npm install
npm run build

# 10. Test connection
curl http://72.61.209.163:8800/health

# 11. Test on website
# Open: https://puptquiz.com
# Try: Generate a quiz
```

---

## ⏱️ Timeline

```
SSH Connect:           1 minute
Navigate/Verify:       2 minutes
Automated Setup:       5-10 minutes
Exit VPS:             < 1 minute
Update Website:        2 minutes
Build Website:         2-3 minutes
Test:                 1 minute
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                15-20 minutes
```

---

## 🆘 Troubleshooting

### Problem: SSH says "command not found"

**Solution:** You need SSH installed. On Windows, it comes with PowerShell in newer versions.

**Alternative:** Use PuTTY
1. Download: https://www.putty.org/
2. Open PuTTY
3. Enter IP: `72.61.209.163`
4. Click "Open"
5. Username: `root`
6. Password: `WOLhxiAgPssTz3CUsO;7`

### Problem: "Permission denied" on SSH

**Solution:** Wrong password. Double-check:
- Password: `WOLhxiAgPssTz3CUsO;7`
- IP: `72.61.209.163`
- Username: `root`

### Problem: Setup script fails

**Solution:** Check the logs:
```bash
pm2 logs ai-quiz-service
```

Look for errors and report them.

### Problem: Website still says "Failed to fetch"

**Possible causes:**

1. **Didn't update .env correctly**
   - Check: `grep VITE_AI_SERVICE_URL .env`
   - Should show: `http://72.61.209.163:8800`

2. **Didn't rebuild website**
   - Run: `npm run build` again

3. **VPS service not running**
   - SSH back to VPS
   - Run: `pm2 status`
   - Should show: `online`

4. **Firewall blocked port**
   - SSH to VPS
   - Run: `sudo ufw allow 8800`

---

## ✅ Checklist

After completing all steps:

- [ ] SSH connected to VPS successfully
- [ ] Navigated to PUPQUIZ folder
- [ ] Setup script completed with checkmarks
- [ ] Exited VPS
- [ ] Updated .env file with correct IP
- [ ] Ran npm run build
- [ ] Curl test returned JSON response
- [ ] Visited puptquiz.com
- [ ] Generated a quiz
- [ ] Quiz appeared without errors ✓

---

## 🚀 Next Steps

You're done! Your AI quiz generator is live and running.

### Maintenance

Every time you want to check if it's still running:

```bash
# SSH to VPS
ssh root@72.61.209.163

# Check status
pm2 status

# View logs
pm2 logs ai-quiz-service

# Restart if needed
pm2 restart ai-quiz-service

# Exit
exit
```

---

## 📞 Need Help?

1. **Can't connect SSH?** → Use PuTTY (link above)
2. **Setup failed?** → Check `pm2 logs ai-quiz-service`
3. **Website not connecting?** → Verify `.env` has correct IP
4. **Service crashed?** → Run `pm2 restart ai-quiz-service`

---

**You've got this! Follow the steps above and your AI quiz generator will be live! 🚀**

Good luck! 🎉
