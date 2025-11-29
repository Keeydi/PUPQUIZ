# Automated Setup - Step by Step

## Step 1: Open PowerShell Correctly

You need to use Windows PowerShell or Command Prompt (not bash).

### For Windows 10/11:

**Option A: Using PowerShell**
1. Press: `Windows Key + R`
2. Type: `powershell`
3. Press: `Enter`

You should see:
```
PS C:\Users\Administrator>
```

**Option B: Using Command Prompt**
1. Press: `Windows Key + R`
2. Type: `cmd`
3. Press: `Enter`

You should see:
```
C:\Users\Administrator>
```

---

## Step 2: Connect to VPS via SSH

In PowerShell or CMD, paste this command:

```powershell
ssh root@72.61.209.163
```

Press `Enter`

You will see:
```
The authenticity of host '72.61.209.163' cannot be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type: `yes`
Press: `Enter`

Then paste your password:
```
WOLhxiAgPssTz3CUsO;7
```

Press: `Enter`

**Success:** You should see:
```
root@vps-xxx:~#
```

---

## Step 3: Navigate to Project

Once inside VPS, run:

```bash
cd ~/PUPQUIZ
```

Or if that doesn't work:

```bash
cd /root/PUPQUIZ
```

Verify you're in the right place:

```bash
ls -la
```

You should see files like:
- app.py
- requirements.txt
- setup_vps.sh

---

## Step 4: Run the Automated Setup Script

Now paste this command:

```bash
bash setup_vps.sh
```

Press: `Enter`

**Wait for completion** (about 5-10 minutes)

You should see green ✓ checkmarks for each step:
```
→ Navigating to project directory...
✓ Project directory: /root/PUPQUIZ
→ Pulling latest code from GitHub...
✓ Code updated
...
✓ Setup completed successfully! 🎉
```

---

## Step 5: Save the Output

At the end, you'll see something like:

```
Your Service Information:
  Service Name: ai-quiz-service
  Service URL: http://72.61.209.163:8800
  Status: Online
```

**Save this information!** You'll need it for the next step.

---

## Step 6: Exit VPS

Type:
```bash
exit
```

Press: `Enter`

You're back to your local computer.

---

## Step 7: Update Your Main Website

Now you need to update your website's `.env` file.

**On your main website server:**

```bash
# Navigate to website directory
cd ~/puptquiz

# Edit .env file
nano .env
```

**Find this line (around line 96):**
```
VITE_AI_SERVICE_URL=http://localhost:8800
```

**Replace with:**
```
VITE_AI_SERVICE_URL=http://72.61.209.163:8800
```

**Save:**
- Press: `Ctrl + X`
- Type: `Y`
- Press: `Enter`

---

## Step 8: Rebuild Website

Still on your website server:

```bash
npm run build
```

Wait for completion (1-2 minutes)

---

## Step 9: Test

```bash
curl http://72.61.209.163:8800/health
```

Should return:
```json
{"status":"healthy","service":"Quiz Generation API","version":"1.0.0"}
```

---

## Step 10: Test on Live Website

1. Open browser
2. Go to: `https://puptquiz.com`
3. Click: "Explore" or "AI Quiz Generator"
4. Try: Generate a quiz
5. Should work! ✓

---

## If SSH Connection Fails

### Error: "ssh: command not found"

**Windows 10/11 has SSH built-in, but you might need to enable it.**

**Alternative: Use PuTTY**

1. Download: https://www.putty.org/
2. Open PuTTY
3. In "Host Name (or IP address)", paste: `72.61.209.163`
4. Click "Open"
5. When prompted:
   - Username: `root`
   - Password: `WOLhxiAgPssTz3CUsO;7`

---

## If Script Fails

If `bash setup_vps.sh` doesn't work:

```bash
chmod +x setup_vps.sh
./setup_vps.sh
```

Or run manually:

```bash
# Navigate to project
cd ~/PUPQUIZ

# Pull latest code
git pull origin main

# Create virtual environment
python3 -m venv venv

# Activate
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install PM2
npm install -g pm2

# Start service
pm2 start app.py --name ai-quiz-service --interpreter python3
pm2 startup
pm2 save

# Allow firewall
sudo ufw allow 8800

# Verify
pm2 status
```

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "ssh: command not found" | Use PuTTY instead |
| "Connection refused" | Check VPS IP: 72.61.209.163 |
| "Permission denied" | Check password: WOLhxiAgPssTz3CUsO;7 |
| "script not found" | Make sure you're in ~/PUPQUIZ directory |
| "Permission denied (setup_vps.sh)" | Run: `chmod +x setup_vps.sh` |

---

## ✅ Success Indicators

After setup completes:

- ✓ `pm2 status` shows "online"
- ✓ `curl http://72.61.209.163:8800/health` returns JSON
- ✓ Website .env updated
- ✓ `npm run build` completed
- ✓ Website quiz generator works

---

**You've got this! Follow the steps above and your AI service will be live! 🚀**
