# PUPQUIZ Architecture - Your Setup

## System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         PUPQUIZ SYSTEM                           │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    MAIN WEBSITE (Hostinger)                     │
│                   puptquiz.com (HTTPS)                          │
├─────────────────────────────────────────────────────────────────┤
│ • Laravel Backend                                               │
│ • React/Vite Frontend                                           │
│ • Quiz Management                                               │
│ • User Authentication                                           │
│ • Database (MySQL)                                              │
│                                                                 │
│ When user clicks "Generate Quiz with AI":                       │
│   → Makes HTTP request to VPS Python service                    │
│   → Receives generated quiz                                     │
│   → Displays to user                                            │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                        HTTP Request
                         Port 8800
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    VPS PYTHON SERVICE                           │
│               (72.61.209.163:8800)                              │
├─────────────────────────────────────────────────────────────────┤
│ • Flask Server (Python)                                         │
│ • PM2 Process Manager (keeps it running 24/7)                   │
│ • Google Gemini 2.0 Flash API Integration                       │
│ • CORS Enabled (allows requests from website)                   │
│                                                                 │
│ API Endpoints:                                                  │
│   POST /generate-quiz - Generate from image/PDF                │
│   POST /generate-quiz-from-text - Generate from text/topic      │
│   POST /generate-custom-prompt-quiz - Generate from prompt      │
│   GET /health - Health check                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                        API Request
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                   Google Gemini 2.0 Flash API                   │
│                    (Cloud AI Service)                           │
├─────────────────────────────────────────────────────────────────┤
│ • AI Model generates quiz questions                             │
│ • Returns formatted questions with answers                      │
│ • Powered by AIzaSyCAo26Wk8t7ryLLfO0NWXa8cSy2eBhY8s0            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
USER INTERACTION:

1. Student visits https://puptquiz.com
                ↓
2. Clicks "Generate Quiz with AI"
                ↓
3. Selects topic/uploads image/enters prompt
                ↓
4. Clicks "Generate Quiz"
                ↓
5. Website sends request to VPS:
   GET http://72.61.209.163:8800/generate-quiz
   {
     "topic": "Mathematics",
     "num_questions": 10,
     "difficulty": "medium",
     ...
   }
                ↓
6. VPS Python Service receives request
                ↓
7. Calls Google Gemini API with prompt
                ↓
8. Google AI generates quiz questions
                ↓
9. VPS returns JSON response:
   {
     "success": true,
     "quiz": {
       "questions": [
         {
           "question": "What is 2+2?",
           "options": ["3", "4", "5", "6"],
           "correct_answer": "4",
           ...
         },
         ...
       ]
     }
   }
                ↓
10. Website receives quiz data
                ↓
11. Displays questions to student
                ↓
12. Student takes the quiz
```

---

## System Components

### 1. Frontend (Website)
```
Location:  Hostinger (puptquiz.com)
Framework: React + Vite
Port:      443 (HTTPS)
File:      resources/js/Pages/Explore.tsx

What it does:
• User interface for quiz generation
• Sends requests to Python service
• Displays generated quizzes
• Manages quiz taking
```

### 2. Backend (Laravel)
```
Location:  Hostinger (same as frontend)
Framework: Laravel
Database:  MySQL (pup_quiz)
Ports:     80/443

What it does:
• User authentication
• Quiz storage
• Attempt tracking
• Database management
```

### 3. Python AI Service
```
Location:  Hostinger VPS (72.61.209.163)
Framework: Flask
Port:      8800
Process:   PM2 (ai-quiz-service)
Files:     app.py, requirements.txt

What it does:
• Receives quiz generation requests
• Calls Google Gemini API
• Returns formatted quiz data
• Runs 24/7 with auto-restart
```

### 4. External API
```
Service:   Google Gemini 2.0 Flash
Location:  Google Cloud
API Key:   AIzaSyCAo26Wk8t7ryLLfO0NWXa8cSy2eBhY8s0

What it does:
• Generates quiz questions using AI
• Uses natural language processing
• Provides intelligent responses
```

---

## Network Flow

```
Student Computer
       ↓
    Internet
       ↓
   Hostinger Main Server (puptquiz.com)
       ├─→ Laravel Backend
       └─→ React Frontend
          (Makes HTTP request to VPS)
       ↓
   Internet
       ↓
   Hostinger VPS (72.61.209.163:8800)
       ├─→ Flask Python App
       ├─→ PM2 Process Manager
       └─→ Google API Client
          (Calls Google Gemini API)
       ↓
   Google Cloud
       └─→ Gemini AI Model
          (Generates quiz)
```

---

## How It All Works Together

### Setup Flow:
```
1. Main website (Laravel) + VPS (Python) are on different servers
2. Website needs to know where to find Python service
3. Configuration in .env file:
   VITE_AI_SERVICE_URL=http://72.61.209.163:8800
4. Frontend uses this URL to make requests

This way:
• Website can be anywhere (puptquiz.com)
• Python service can be on VPS (72.61.209.163:8800)
• They communicate via HTTP over the internet
```

### Runtime Flow:
```
1. Student visits website (puptquiz.com)
2. Student clicks "Generate Quiz"
3. Website JavaScript code prepares quiz request
4. Website makes HTTP POST to: 72.61.209.163:8800/generate-quiz
5. VPS receives request
6. Python code processes it
7. Python calls Google Gemini API
8. Google returns AI-generated questions
9. Python formats response
10. Python sends back to website
11. Website displays quiz to student
12. Student takes the quiz
```

---

## Architecture Diagram

```
                     INTERNET
    ┌────────────────────────────────────────────┐
    │                                            │
    ↓                                            ↓

┌─────────────────────────────┐    ┌──────────────────────────┐
│   HOSTINGER MAIN SERVER     │    │   HOSTINGER VPS          │
│   puptquiz.com              │    │   72.61.209.163:8800     │
├─────────────────────────────┤    ├──────────────────────────┤
│ Nginx/Apache Web Server     │    │ Linux Server             │
├─────────────────────────────┤    ├──────────────────────────┤
│ Laravel Application         │    │ Python Flask App         │
│ • Routes                    │    │ • API Endpoints          │
│ • Controllers               │    │ • Request Processing     │
│ • Models                    │    │ • Google API Client      │
│ • Middleware                │    │ • PM2 Process Manager    │
├─────────────────────────────┤    ├──────────────────────────┤
│ React/Vite Frontend         │    │ Port 8800                │
│ • Explore.tsx               │    │ • /generate-quiz         │
│ • Dashboard.tsx             │    │ • /health                │
│ • Quiz Generation UI        │    │ • Auto-restart           │
├─────────────────────────────┤    ├──────────────────────────┤
│ MySQL Database              │    │ .env (Google API Key)    │
│ • Users                     │    │ • app.py                 │
│ • Quizzes                   │    │ • requirements.txt       │
│ • Attempts                  │    │                          │
│ • Questions                 │    │ Logs:                    │
│                             │    │ • pm2 logs               │
└─────────────────────────────┘    └──────────────────────────┘
         ↑                                   ↑
         │                                   │
         └───────────────────────────────────┘
           HTTP Communication (Port 8800)
              VITE_AI_SERVICE_URL
         http://72.61.209.163:8800
```

---

## File Locations

```
Main Website Server (puptquiz.com):
├── /home/web/puptquiz/
│   ├── app/
│   ├── resources/
│   │   └── js/
│   │       └── Pages/
│   │           └── Explore.tsx ← Makes requests to VPS
│   ├── .env ← Contains VITE_AI_SERVICE_URL
│   ├── package.json
│   └── ...

VPS Server (72.61.209.163):
├── /root/PUPQUIZ/ (or /home/username/PUPQUIZ/)
│   ├── app.py ← Flask application
│   ├── requirements.txt ← Python dependencies
│   ├── .env ← Contains GOOGLE_API_KEY
│   ├── venv/ ← Python virtual environment
│   └── ...

Google Cloud:
├── Gemini 2.0 Flash API
│   └── Uses API Key: AIzaSy...
```

---

## Configuration

### Main Website (.env)
```env
# Points to the VPS Python service
VITE_AI_SERVICE_URL=http://72.61.209.163:8800
```

### VPS Python Service (.env)
```env
# Google AI API Key
GOOGLE_API_KEY=AIzaSyCAo26Wk8t7ryLLfO0NWXa8cSy2eBhY8s0

# Service Port
PORT=8800

# Environment
APP_ENV=production
```

---

## Scalability & Performance

```
Current Setup:
• Flask app with 1 process
• Handles concurrent requests
• Can process multiple quiz requests simultaneously

If Need to Scale:
• Gunicorn with multiple workers
• Load balancer in front of VPS
• Multiple VPS instances
• Caching layer (Redis)
• Rate limiting per user
```

---

## Security

```
✓ CORS Enabled: Website can communicate with VPS
✓ Google API Key: Secured in .env file (not in code)
✓ HTTPS: Main website uses SSL/TLS
✓ PM2: Keeps service running securely
✓ Firewall: Port 8800 specifically allowed
✓ Environment Variables: Secrets not exposed in code
```

---

## Monitoring & Maintenance

```
Daily:
• Check: pm2 status
• View: pm2 logs ai-quiz-service
• Monitor: VPS resource usage

Weekly:
• Check error logs
• Verify API quota usage
• Test health endpoint

Monthly:
• Review performance metrics
• Check Google API billing
• Update dependencies (if needed)
```

---

## Summary

Your PUPQUIZ system has three main parts:

1. **Main Website** (puptquiz.com)
   - Runs on Hostinger
   - Users interact here
   - Makes requests to VPS for AI quizzes

2. **VPS Python Service** (72.61.209.163:8800)
   - Runs 24/7 with PM2
   - Receives requests from website
   - Calls Google AI API

3. **Google Gemini API**
   - Cloud-based AI service
   - Generates quiz questions
   - Powers the intelligence

Everything is connected, scalable, and ready for production!

---

**Your system is now ready to generate unlimited AI quizzes! 🚀**
