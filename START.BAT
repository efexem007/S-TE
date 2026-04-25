@echo off
echo ==========================================
echo  DueM via Work - Local Server Baslatiliyor
echo ==========================================
echo.
cd /d "C:\Users\mefe0\OneDrive\Masaüstü\duemviawork"
echo Proje dizini: %CD%
echo.
echo Next.js dev server baslatiliyor...
echo Site acildiktan sonra tarayicinizda http://localhost:3000 adresine gidin.
echo.
npx next dev
pause
