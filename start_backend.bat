@echo off
title LANDGUARD AI - Backend Service (Port 8000)
cd /d "%~dp0backend"
echo ========================================================
echo Starting LANDGUARD AI Backend (FastAPI + SQLite)...
echo ========================================================
if exist "d:\tools\python\python.exe" (
    d:\tools\python\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
) else if exist "venv\Scripts\python.exe" (
    venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
) else (
    python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
)
pause
