@echo off
pushd "%~dp0"

REM proto路径
set dest=..\..\..\Mahjong\MahjongProto
pushd %dest%
echo git pull %dest%
git pull
pushd "%~dp0"
del /Q %dest%\*.ts
if exist %dest%\protobuf.bat call %dest%\protobuf.bat
del /Q .\src\proto\*.ts
copy /Y %dest%\*.ts .\src\proto

REM 表格路径
set dest=..\..\..\Mahjong\MahjongLobbyCommon\table
pushd %dest%
echo gut pull %dest%
git pull
pushd "%~dp0"
del /Q .\src\table\*.ts
copy /Y %dest%\*.ts .\src\table

REM game.release路径
set dest=..\..\..\Egret\game.release
copy /Y %dest%\*.ts .\src\table

echo egret build 
egret build

popd

if "%1"=="" pause