@echo off
setlocal

echo 🚀 Preparing release for DevUtils

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist dist rmdir /s /q dist

REM Build the application
echo 📦 Building application...
call npm run build:release

if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed
    exit /b 1
)

echo ✅ Build completed successfully!
echo 📁 Files created in dist folder:
dir dist\*.exe

echo.
echo 🏷️  To create a GitHub release:
echo    1. git add .
echo    2. git commit -m "Release v1.0.0"
echo    3. git push origin main
echo    4. git tag v1.0.0
echo    5. git push origin v1.0.0
echo.
echo 🌐 Or create a release manually at:
echo    https://github.com/ahammadabdullah/dev-utils/releases/new

pause
