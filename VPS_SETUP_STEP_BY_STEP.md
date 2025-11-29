# VPS Setup - Step by Step Guide for Hostinger

## Prerequisites
- You should have received VPS credentials from Hostinger
- You need: **VPS IP Address**, **username**, and **password** (or SSH key)
- Have a terminal/command line tool ready

---

## Step 1: SSH into Your VPS

### What is SSH?
SSH is a secure way to connect to your VPS remotely. It's like remote desktop but for command line.

### For Windows Users:

**Option A: Using PowerShell (Built-in)**
```powershell
ssh root@YOUR_VPS_IP
```

**Option B: Using PuTTY (Recommended for Windows)**
1. Download PuTTY: https://www.putty.org/
2. Open PuTTY
3. In "Host Name", enter: `YOUR_VPS_IP`
4. Port: `22`
5. Click "Open"
6. Enter username: `root`
7. Enter password: (provided by Hostinger)

**Option C: Using Windows Terminal**
```powershell
# Install OpenSSH Client if needed
# Then use the same command as above
ssh root@YOUR_VPS_IP
```

### For Mac/Linux Users:

```bash
ssh root@YOUR_VPS_IP
```

### Finding Your VPS IP

You should have received this from Hostinger. It looks like: `123.45.67.89`

**If you lost it:**
1. Log in to Hostinger Control Panel: https://hpanel.hostinger.com/
2. Go to "Hosting" → Your VPS
3. Look for "IP Address" or "Server IP"

### Once Connected

You should see something like:
```
root@vps-xyz:~#
```

This means you're now inside your VPS! The `#` prompt indicates you're logged in as root (administrator).

---

## Step 2: Navigate to Your Project & Pull Latest Code

```bash
# First, check where your project is located
# Usually one of these:
cd /home/username/PUPQUIZ
# OR
cd /root/PUPQUIZ
# OR
cd ~/PUPQUIZ

# If you're not sure where it is, search for it:
find ~ -name "PUPQUIZ" -type d 2>/dev/null

# Once you find it, navigate to it
cd /path/to/PUPQUIZ

# Pull the latest code from GitHub
git pull origin main
```

**What this does:**
- Downloads the latest changes you pushed (including our new files)
- Makes sure you have the updated `app.py`, `requirements.txt`, etc.

---

## Step 3: Setup Python Virtual Environment

A virtual environment is like a sandbox for Python dependencies - keeps things clean and isolated.

```bash
# Create virtual environment
python3 -m venv venv

# This creates a "venv" folder with Python installed
# Takes about 30 seconds to 1 minute
```

**Then activate it:**

```bash
# Activate the virtual environment
source venv/bin/activate

# You should see "(venv)" appear in your terminal prompt like:
# (venv) root@vps-xyz:~/PUPQUIZ#
```

**Install all dependencies:**

```bash
# This installs Flask, Google AI library, Gunicorn, etc.
pip install -r requirements.txt

# This may take 2-3 minutes as it downloads libraries
```

**Verify installation:**

```bash
# Check Python version
python --version

# Check if Flask is installed
python -c "import flask; print(flask.__version__)"

# Should show: 3.0.0
```

---

## Step 4: Install PM2 & Start the Service

PM2 is a process manager that keeps your Python service running 24/7, even if it crashes or the VPS restarts.

### Install PM2

```bash
# First, check if Node.js is installed
node --version

# If not installed, install it:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Now install PM2 globally
npm install -g pm2

# Verify PM2 is installed
pm2 --version
```

### Start Your Python Service with PM2

```bash
# Make sure you're still in your project directory
cd ~/PUPQUIZ

# Start the Python app with PM2
pm2 start app.py --name ai-quiz-service --interpreter python3

# You should see:
# ┌─────────────────────────────────────────────────┐
# │ App name      │ id │ version │ mode │ pid │ status │
# ├─────────────────────────────────────────────────┤
# │ ai-quiz-service │ 0  │         │ fork │ 1234 │ online │
# └─────────────────────────────────────────────────┘
```

### Make PM2 Start on VPS Reboot

This is **IMPORTANT** - ensures your service restarts if the VPS reboots:

```bash
# Generate startup script
pm2 startup

# You'll see a long command to copy. Copy and paste the entire command shown.
# It will look something like:
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /root

# After running that, save your PM2 configuration
pm2 save

# Verify it's saved
pm2 list
```

### Test If Service is Running

```bash
# Check status
pm2 status

# View logs
pm2 logs ai-quiz-service

# You should see:
# Starting Quiz Generation API server on http://0.0.0.0:8800
# Debug mode: False
# API Key configured: Yes
```

---

## Step 5: Allow Firewall Traffic

Your VPS firewall might block port 8800. This step opens it up.

```bash
# Check if firewall is enabled
sudo ufw status

# If it shows "Status: inactive", you don't need this step

# If it's active, allow port 8800
sudo ufw allow 8800

# Verify it's allowed
sudo ufw status
# You should see "8800/tcp ALLOW" in the list
```

---

## Step 6: Get Your VPS IP Address

You need this to configure your main website.

```bash
# Get your VPS IP
hostname -I

# Output will be like:
# 123.45.67.89 10.0.0.1

# The first IP (123.45.67.89) is your public IP - this is what you need!
```

**Save this IP!** You'll need it in the next steps.

---

## Verify Everything Works

### Test from VPS itself

```bash
# While still in your VPS, test if the service responds
curl http://localhost:8800/health

# You should get:
# {"status":"healthy","service":"Quiz Generation API","version":"1.0.0"}
```

### Test from Your Local Computer

```bash
# Open PowerShell/Terminal on your local computer
# Replace 123.45.67.89 with your actual VPS IP

curl http://123.45.67.89:8800/health

# Should return the same JSON response
```

---

## Summary of Commands (Copy & Paste)

If you want to paste everything at once:

```bash
# 1. Connect to VPS
ssh root@YOUR_VPS_IP
# Enter password when prompted

# 2. Navigate to project
cd ~/PUPQUIZ

# 3. Pull latest code
git pull origin main

# 4. Setup Python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 5. Install Node & PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
npm install -g pm2

# 6. Start the service
pm2 start app.py --name ai-quiz-service --interpreter python3
pm2 startup
pm2 save

# 7. Allow firewall
sudo ufw allow 8800

# 8. Get your IP (IMPORTANT - save this!)
hostname -I
```

---

## Troubleshooting

### Service won't start
```bash
# Check the error logs
pm2 logs ai-quiz-service

# Common issues:
# - Port 8800 already in use: pm2 start app.py --name ai-quiz-service --interpreter python3 -- --port 8801
# - Missing API key: check .env file has GOOGLE_API_KEY
# - Missing dependencies: pip install -r requirements.txt
```

### Can't connect from main website
```bash
# 1. Verify service is running
pm2 status

# 2. Test from VPS
curl http://localhost:8800/health

# 3. Test from your computer
curl http://YOUR_VPS_IP:8800/health

# 4. Check firewall
sudo ufw status

# 5. Check if port is open
netstat -tlnp | grep 8800
```

### Service keeps crashing
```bash
# Check logs
pm2 logs ai-quiz-service

# Restart it
pm2 restart ai-quiz-service

# Check if Python/API key issues
python3 app.py  # Run directly to see errors
```

---

## Next Steps After VPS Setup

Once your VPS service is running, you need to:

1. **On your main website server (Hostinger):**
   ```bash
   # Update .env with your VPS IP
   VITE_AI_SERVICE_URL=http://123.45.67.89:8800
   
   # Rebuild frontend
   npm run build
   ```

2. **Test the connection:**
   ```bash
   curl http://YOUR_VPS_IP:8800/health
   ```

3. **Visit your website and try generating a quiz**

---

## Keep These Credentials Safe

- VPS IP: `_____________`
- VPS Username: `root`
- VPS Password: `_____________`
- Google API Key: Check your .env

