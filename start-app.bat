@echo off
echo Starting Bounce Travel App...
echo.

echo Starting backend server...
start /b node simple-server.js
timeout /t 3

echo Starting frontend development server...
start cmd /k "npm run dev"

echo.
echo ======================================
echo Bounce Travel App is starting!
echo ======================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3001/api/health
echo.
echo Press any key to stop the backend server...
pause

echo Stopping backend server...
taskkill /f /im node.exe >nul 2>&1
echo Backend stopped.
pause
