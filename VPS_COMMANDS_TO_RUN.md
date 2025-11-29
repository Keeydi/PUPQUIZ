# Commands to Run on Your Hostinger VPS

## Step 1: Navigate to Your Project
```bash
cd ~/PUPQUIZ
```

## Step 2: Check Current Status
```bash
pm2 status
```

**What to look for:**
- If you see `ai-quiz-service` with status `online` ✅ → Service is already running (skip to Step 5)
- If you see `ai-quiz-service` with status `stopped` or `errored` ⚠️ → Run Step 3
- If you DON'T see `ai-quiz-service` at all ❌ → Run Step 3

## Step 3: Start the Python AI Service (if not running)
```bash
pm2 start app.py --name ai-quiz-service --interpreter python3
```

## Step 4: Save PM2 Configuration
```bash
pm2 save
```

## Step 5: Verify Service is Running
```bash
pm2 status
```

Should show:
```
id │ name                 │ namespace   │ version │ mode     │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │
───┼──────────────────────┼─────────────┼─────────┼──────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┤
0  │ ai-quiz-service      │ default     │ N/A     │ fork     │ xxxxxx   │ ...    │ 0    │ online    │ 0.0%     │ ...      │
```

## Step 6: Check Logs (if anything goes wrong)
```bash
pm2 logs ai-quiz-service
```

## Step 7: Test the Service
```bash
curl http://localhost:8800/health
```

**Should return:**
```json
{
  "status": "healthy",
  "service": "Quiz Generation API",
  "version": "1.0.0"
}
```

## Step 8: Allow Port 8800 Through Firewall
```bash
sudo ufw allow 8800
```

## Step 9: Test from Outside (Optional)
```bash
curl http://72.61.209.163:8800/health
```

---

## Troubleshooting

### If service won't start:
```bash
# Check Python is installed
python3 --version

# Check if requirements are installed
pip list | grep flask

# Try installing requirements
pip install -r requirements.txt

# Try again
pm2 start app.py --name ai-quiz-service --interpreter python3
```

### If port 8800 is already in use:
```bash
# Find what's using port 8800
sudo lsof -i :8800

# Kill it (replace PID with actual number)
sudo kill -9 PID
```

### Check if app.py exists:
```bash
ls -la app.py
```

---

## Done! ✅

Once service shows as `online`, your AI quiz generator will work on puptquiz.com!

