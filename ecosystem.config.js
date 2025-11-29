{
  "apps": [
    {
      "name": "ai-quiz-service",
      "script": "app.py",
      "interpreter": "python3",
      "watch": false,
      "max_memory_restart": "500M",
      "env": {
        "PORT": "8800",
        "APP_ENV": "production"
      },
      "error_file": "./logs/ai-service-error.log",
      "out_file": "./logs/ai-service-out.log",
      "log_date_format": "YYYY-MM-DD HH:mm:ss Z",
      "merge_logs": true,
      "instances": 1,
      "exec_mode": "fork"
    }
  ]
}
