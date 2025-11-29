# ⚡ QUICK FIX - Enable SSH & Connect Now

## Problem
SSH is not installed on your Windows system. But we can fix it in 2 minutes!

---

## ✅ Solution: Run the Installation Script

### Step 1: Find the Script

In your file explorer, navigate to:
```
C:\Users\Administrator\Downloads\PUPQUIZ
```

Look for: **`install_ssh.bat`** (should be there now)

### Step 2: Run as Administrator

**Right-click** on `install_ssh.bat`

Select: **"Run as administrator"**

You should see a black window open:
```
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
...
Success : True
RestartNeeded : False
```

### Step 3: Close the Window

Press any key to close when done.

### Step 4: Restart PowerShell

Close PowerShell completely and open a new one.

---

## 🎯 Now You're Ready!

Once you restart PowerShell, run this command:

```powershell
ssh root@72.61.209.163
```

When it asks:
- Type: `yes`
- Password: `WOLhxiAgPssTz3CUsO;7`

Then you'll see:
```
root@vps-xxxx:~#
```

---

## 🚀 After SSH Connection

Once connected, paste these commands one by one:

### Command 1: Navigate to Project
```bash
cd PUPQUIZ
```

### Command 2: Run Setup (5-10 minutes)
```bash
bash setup_vps.sh
```

Wait for it to complete with checkmarks.

### Command 3: Exit VPS
```bash
exit
```

---

## 📝 Complete Sequence

```
1. Run: install_ssh.bat (right-click → Run as administrator)
2. Restart PowerShell
3. ssh root@72.61.209.163 (password: WOLhxiAgPssTz3CUsO;7)
4. cd PUPQUIZ
5. bash setup_vps.sh (wait 5-10 min)
6. exit
7. Update website .env
8. npm run build
9. Done! ✅
```

---

**Go run `install_ssh.bat` now and let me know when you see SSH working! 🚀**
