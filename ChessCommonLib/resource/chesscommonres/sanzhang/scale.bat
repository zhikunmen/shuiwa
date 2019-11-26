@echo off

for /f "usebackq tokens=*" %%d in (`dir /s /b *.png *.jpg`) do (
ImageScale.bat 1.333 "%%d"
)
pause