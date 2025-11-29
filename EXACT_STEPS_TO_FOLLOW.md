# 🎯 EXACT STEPS - Do This Now

## ⚠️ Important

You need to:
1. SSH **to the VPS** first
2. **Then** run the setup script on the VPS
3. Not run it on your local computer

---

## Step 1️⃣ : SSH to VPS

**In PowerShell, paste exactly:**

```powershell
ssh root@72.61.209.163
```

**Press Enter**

---

## Step 2️⃣ : Answer the Security Question

You'll see:
```
The authenticity of host '72.61.209.163' cannot be established.
Are you sure you want to continue connecting (yes/no)?
```

**Type:** `yes`

**Press Enter**

---

## Step 3️⃣ : Enter Password

You'll see:
```
root@72.61.209.163's password:
```

**Paste:** `WOLhxiAgPssTz3CUsO;7`

**Press Enter**

---

## Step 4️⃣ : You're Now on VPS!

You should see:
```
root@vps-xxxx:~#
```

**This means you're on the VPS, not your local computer!**

---

## Step 5️⃣ : Run the Setup Script

**Paste this command:**

```bash
cd PUPQUIZ && bash setup_vps.sh
```

**Press Enter**

---

## Step 6️⃣ : Watch It Install

You'll see:
```
==========================================
PUPQUIZ AI Service - VPS Setup Script
==========================================

→ Navigating to project directory...
✓ Project directory: /root/PUPQUIZ
→ Pulling latest code from GitHub...
✓ Code updated
...
```

**Wait 5-10 minutes for completion**

You'll see green ✓ checkmarks for each step

---

## Step 7️⃣ : Wait for Completion

At the end, you should see:
```
✓ Setup completed successfully! 🎉

Your Service Information:
  Service Name: ai-quiz-service
  Service URL: http://72.61.209.163:8800
  Status: Online

Next Steps:
  1. Update your main website .env:
     VITE_AI_SERVICE_URL=http://72.61.209.163:8800
  2. Rebuild frontend: npm run build
  3. Test on website: https://puptquiz.com
```

**Copy that Service URL!** You'll need it.

---

## Step 8️⃣ : Exit VPS

**Type:**

```bash
exit
```

**Press Enter**

You should see your local prompt again:
```
C:\Users\Administrator>
```

---

## Step 9️⃣ : Update Your Website

**On your local computer, navigate to your website:**

```bash
cd ~/puptquiz
```

**Edit the .env file:**

```bash
nano .env
```

**Find this line:**
```
VITE_AI_SERVICE_URL=http://localhost:8800
```

**Replace it with:**
```
VITE_AI_SERVICE_URL=http://72.61.209.163:8800
```

**Save:**
- Press: `Ctrl+X`
- Type: `Y`
- Press: `Enter`

---

## Step 🔟 : Rebuild Website

**Type:**

```bash
npm run build
```

**Press Enter**

Wait 1-2 minutes for completion

---

## Step 1️⃣1️⃣ : Test

**Type:**

```bash
curl http://72.61.209.163:8800/health
```

**Press Enter**

You should see:
```json
{"status":"healthy","service":"Quiz Generation API","version":"1.0.0"}
```

---

## Step 1️⃣2️⃣ : Test on Website

1. **Open browser**
2. **Visit:** `https://puptquiz.com`
3. **Click:** "Explore" or "AI Quiz Generator"
4. **Try:** Generate a quiz
5. **See:** Quiz appears! ✓

---

## 🎉 Done!

Your AI quiz generator is now live!

---

## 📍 Key Points to Remember

✅ **SSH first** - connects you to VPS
✅ **Then run setup** - on the VPS
✅ **Exit VPS** - when done with setup
✅ **Update website** - on your local computer
✅ **Rebuild** - on your local computer

---

## 🆘 If You Get Lost

Look for this:

**Are you on VPS?**
```
root@vps-xxxx:~#     ← VPS (correct place for setup)
```

**Are you on local?**
```
C:\Users\Administrator>     ← Local (correct for website updates)
Administrator@PC32 MINGW64  ← Local (correct for website updates)
```

---

## 🚀 Ready?

Start with **Step 1** above!

Good luck! 🎉
