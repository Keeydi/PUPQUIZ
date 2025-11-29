# 🔧 Alternative: Use Git Bash for SSH

Since Windows service installation is failing, we'll use **Git Bash** which has SSH built-in!

---

## ✅ Step 1: Install Git for Windows (with Git Bash)

### If you already have Git installed:
Skip to **Step 2**.

### If you don't have Git:

1. Go to: **https://git-scm.com/download/win**
2. Click: **Download** (should auto-download)
3. Run the installer
4. When asked about "SSH executable", select: **"Use OpenSSH"** or just use defaults
5. Complete installation

---

## ✅ Step 2: Open Git Bash

### Method 1: Right-Click in Folder
1. In File Explorer, navigate to: `C:\Users\Administrator\Downloads\PUPQUIZ`
2. Right-click in empty space
3. Select: **"Git Bash Here"**

A terminal will open.

### Method 2: From Start Menu
1. Press: **Windows Key**
2. Type: `Git Bash`
3. Click: **Git Bash**

---

## 🎯 Step 3: Connect to VPS

In Git Bash, type:

```bash
ssh root@72.61.209.163
```

Press: **Enter**

You'll see:
```
The authenticity of host '72.61.209.163 (72.61.209.163)' can't be established.
```

Type: `yes`

Press: **Enter**

When it asks for password, paste:
```
WOLhxiAgPssTz3CUsO;7
```

Press: **Enter**

---

## 🎯 Step 4: Run Setup

Once connected (you see `root@vps-xxxx:~#`), paste:

```bash
cd PUPQUIZ && bash setup_vps.sh
```

Press: **Enter**

Wait 5-10 minutes for it to complete.

---

## 🎯 Step 5: Complete Setup

When setup finishes, exit:

```bash
exit
```

Then update your website .env file:

```bash
cd ~/puptquiz
nano .env
# Change: VITE_AI_SERVICE_URL=http://72.61.209.163:8800
# Save: Ctrl+X, Y, Enter
```

Then rebuild:

```bash
npm run build
```

---

## ✅ Summary

| Step | Action |
|------|--------|
| 1 | Install Git for Windows (https://git-scm.com/download/win) |
| 2 | Open Git Bash |
| 3 | Run: `ssh root@72.61.209.163` |
| 4 | Password: `WOLhxiAgPssTz3CUsO;7` |
| 5 | Run: `cd PUPQUIZ && bash setup_vps.sh` |
| 6 | Wait 5-10 minutes |
| 7 | Run: `exit` |
| 8 | Update website .env |
| 9 | Run: `npm run build` |

---

**This is the easiest solution!** Git Bash has SSH built-in already. 🚀

Let me know once you install Git and open Git Bash!
