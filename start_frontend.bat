@echo off
title LANDGUARD AI - Frontend Service (Port 5173)
cd /d "%~dp0frontend"
echo ========================================================
echo Starting LANDGUARD AI Frontend (React + Vite)...
echo ========================================================
npm run dev
pause
