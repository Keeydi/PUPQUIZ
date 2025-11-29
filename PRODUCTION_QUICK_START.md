# PUPQUIZ AI Service - Quick Production Checklist

## Your Setup
- **Main Website:** Hostinger (puptquiz.com)
- **Python AI Service:** Hostinger VPS
- **AI Service Port:** 8800

---

## On Your VPS (where Python runs)

### Quick Start - Copy & Paste

```bash
# 1. SSH into VPS
ssh root@YOUR_VPS_IP

# 2. Navigate to project
cd /path/to/PUPQUIZ

# 3. Setup Python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Install PM2 (keep service running forever)
npm install -g pm2

# 5. Start the service
pm2 start app.py --name ai-quiz-service --interpreter python3
pm2 startup
pm2 save

# 6. Allow firewall (if needed)
ufw allow 8800

# 7. Test it works
curl http://localhost:8800/health
```

### Get Your VPS IP
```bash
hostname -I
# Look for the public IP, usually like: 123.45.67.89
```

---

## On Your Main Website Server (Hostinger)

### 1. Update .env
```env
# Change this line to your VPS IP:
VITE_AI_SERVICE_URL=http://YOUR_VPS_IP:8800

# Example:
VITE_AI_SERVICE_URL=http://123.45.67.89:8800
```

### 2. Rebuild Frontend
```bash
npm run build
```

### 3. Test Connection
```bash
# From your main server, verify it can reach VPS
curl http://YOUR_VPS_IP:8800/health

# Should return:
# {"status": "healthy", "service": "Quiz Generation API", "version": "1.0.0"}
```

---

## Verify Everything Works

1. **VPS Service Running**
   ```bash
   pm2 status
   # Should show: online
   ```

2. **Connection Works**
   ```bash
   curl http://YOUR_VPS_IP:8800/health
   # Should return JSON response
   ```

3. **Frontend Updated**
   ```bash
   # Visit your website and try to generate a quiz
   # Should connect to VPS instead of localhost
   ```

---

## If Things Don't Work

### Check VPS Service Status
```bash
pm2 logs ai-quiz-service          # View logs
pm2 restart ai-quiz-service       # Restart service
ps aux | grep app.py              # Check if running
```

### Check Connection
```bash
# From main server
curl -v http://YOUR_VPS_IP:8800/health

# From VPS itself
curl http://localhost:8800/health
```

### Check Firewall
```bash
# On VPS
ufw status
sudo ufw allow 8800

# Test port is open
nc -zv YOUR_VPS_IP 8800
```

### View API Key
```bash
# On VPS, check if API key is configured
grep GOOGLE_API_KEY .env
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Failed to fetch" on website | Check VITE_AI_SERVICE_URL in .env points to VPS IP |
| Service not starting on VPS | Run `pm2 logs ai-quiz-service` to see error |
| Can't connect to VPS | Check firewall: `ufw allow 8800` |
| Service crashes after restart | Use PM2: `pm2 startup && pm2 save` |
| "API key not valid" | Verify GOOGLE_API_KEY in VPS .env file |

---

## Key Files Changed

1. **app.py** - Updated for production (debug=False, 0.0.0.0)
2. **requirements.txt** - Added gunicorn & waitress
3. **.env** - Added VITE_AI_SERVICE_URL
4. **ecosystem.config.js** - PM2 configuration
5. **start_ai_service_production.sh** - Production startup script
6. **VPS_PRODUCTION_SETUP.md** - Detailed setup guide

---

## Push to GitHub

```bash
git add .
git commit -m "Configure AI service for production VPS deployment"
git push origin main
```

Then pull on your servers to get the updated files.

---

**Need Help?**
- Check VPS_PRODUCTION_SETUP.md for detailed instructions
- Run: `pm2 logs ai-quiz-service` to see real-time logs
- Test: `curl http://YOUR_VPS_IP:8800/health` to verify service
