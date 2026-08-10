@echo off
set PATH=%PATH%;C:\Program Files\nodejs
cd /d "%~dp0web"
call npm run dev
