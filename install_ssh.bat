@echo off
REM Install OpenSSH Client for Windows
powershell -Command "Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0"
pause
S