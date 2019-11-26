set commonRes=Egret\resource\assets\common
mkdir .\common
xcopy %commonRes% .\common /S /Y /F
del /Q /S %commonRes%\*
rd /s /q %commonRes%
upa ..\..\Egret\tools git@git.code4.in:Egret/tools.git
python ..\..\Egret\tools\publish.py --runtime=game --version=zmshuiwa --module=zmshuiwa --main_path=ZMShuiWaMain --commonRes_path=%commonRes% --publish_h5_dir=../../Egret/game.release --publish_h5_res=git@git.code4.in:Egret/game.release.git
pause