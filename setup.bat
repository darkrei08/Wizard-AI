@echo off
REM Launcher batch script for Windows to bypass ExecutionPolicy
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup.ps1" %*
