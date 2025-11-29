# ✅ Enable SSH in PowerShell (Windows 10/11)

## Quick Overview

Windows 10/11 has OpenSSH built-in, but it's usually not enabled. We just need to turn it on!

---

## 🎯 Step 1: Open Settings as Administrator

1. Press: **Windows Key + X** (or right-click Start menu)
2. Click: **"Terminal (Admin)"** or **"PowerShell (Admin)"**

You should see:
```
Administrator: Windows PowerShell
PS C:\WINDOWS\system32>
```

**Notice "Administrator" at the top** - this is important!

---

## 🎯 Step 2: Check if SSH is Already Installed

In the PowerShell window, type:

```powershell
Get-WindowsCapability -Online | Where-Object {$_.Name -like 'OpenSSH*'}
```

Press: **Enter**

You'll see one of two results:

### Result A: SSH Already Installed ✅
```
Name  : OpenSSH.Client~~~~0.0.1.0
State : Installed
```

If you see this, **skip to Step 5** (SSH is ready!)

### Result B: SSH Not Installed ❌
```
Name  : OpenSSH.Client~~~~0.0.1.0
State : NotPresent
```

If you see this, **continue to Step 3**.

---

## 🎯 Step 3: Install OpenSSH Client

Still in the **Admin PowerShell**, type:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Press: **Enter**

You'll see:
```
Path          :
Online        : True
RestartNeeded : False

Success       : True
```

**Success!** SSH is now installed! ✅

---

## 🎯 Step 4: Close and Reopen PowerShell

1. Type: `exit`
2. Press: **Enter** (close the admin PowerShell)
3. Open a new PowerShell (regular, not admin needed anymore)
   - Press: **Windows Key + R**
   - Type: `powershell`
   - Press: **Enter**

---

## 🎯 Step 5: Connect to Your VPS

In the PowerShell, type:

```powershell
ssh root@72.61.209.163
```

Press: **Enter**

You'll see:
```
The authenticity of host '72.61.209.163 (72.61.209.163)' can't be established.
RSA key fingerprint is ...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

### Answer Yes

Type: **`yes`**

Press: **Enter**

You'll see:
```
Warning: Permanently added '72.61.209.163' (RSA) to the list of known hosts.
root@72.61.209.163's password:
```

### Enter Password

Paste: **`WOLhxiAgPssTz3CUsO;7`**

Press: **Enter**

(Note: You won't see the password as you type - this is normal)

---

## 🎯 Step 6: Success!

You should see:
```
root@vps-xxxx:~#
```

**You are now connected to your VPS!** 🎉

---

## 🎯 Step 7: Continue with Setup

Now that you're connected, follow the `COMPLETE_BEGINNER_GUIDE.md` **Part 4** onwards:

```bash
# You should be here now:
# root@vps-xxxx:~#

# Navigate to project
cd PUPQUIZ

# Verify files
ls -la

# Run setup (this takes 5-10 minutes)
bash setup_vps.sh

# When done, exit
exit
```

---

## ⏱️ Timeline

```
Enable SSH:           3-5 minutes
Connect to VPS:       1 minute
Run Setup Script:     5-10 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL:                10-15 minutes
```

---

## 🆘 Troubleshooting

### Problem: "Add-WindowsCapability: The requested operation requires elevation"

**Solution:** Make sure you opened PowerShell as Administrator.

1. Close current PowerShell
2. Right-click PowerShell icon
3. Select: **"Run as administrator"**
4. Try Step 3 again

### Problem: "ssh: The term 'ssh' is not recognized"

**Solution:** You didn't restart PowerShell after installing.

1. Close all PowerShell windows
2. Open a NEW PowerShell window
3. Try the SSH command again

### Problem: "Permission denied (publickey,password)"

**Solution:** Wrong password. Make sure you're using exactly:
```
WOLhxiAgPssTz3CUsO;7
```

(Note: There's a semicolon `;` not just a dash)

### Problem: "Could not resolve hostname"

**Solution:** Wrong IP address. Make sure it's exactly:
```
72.61.209.163
```

---

## ✅ Verification

Once connected, verify you're on the VPS:

```bash
pwd
```

Should show:
```
/root
```

Then check your files exist:

```bash
ls -la PUPQUIZ
```

Should show your project files.

---

## 📋 Complete Command Summary

Here's all the commands you need:

```powershell
# === ENABLE SSH (One-time setup) ===
# Open PowerShell as Administrator

Get-WindowsCapability -Online | Where-Object {$_.Name -like 'OpenSSH*'}
# Check if SSH is installed

Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
# Install SSH if not already installed

exit
# Close and reopen PowerShell

# === CONNECT TO VPS ===
ssh root@72.61.209.163
# Type: yes
# Password: WOLhxiAgPssTz3CUsO;7

# === ONCE CONNECTED (You'll see: root@vps-xxxx:~#) ===
pwd
# Should show: /root

ls -la PUPQUIZ
# Should show your files

cd PUPQUIZ
# Navigate to project

bash setup_vps.sh
# Run setup (wait 5-10 minutes)

exit
# Disconnect from VPS
```

---

## 🚀 Next Steps

1. ✅ Enable SSH using the steps above
2. ✅ Connect to your VPS
3. ✅ Run setup_vps.sh
4. ✅ Exit and update website config
5. ✅ Test on puptquiz.com

---

**You've got this! Follow the steps and your AI service will be live! 🚀**
