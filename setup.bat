chcp 1252
@echo off
echo This script will execute the following tasks:
echo * Installing python modules: requests and jodel_api
echo * Installing the dependencies listed in 'packages.json'
echo -- Make sure that node.js and Python 3.x are installed. --

:choice
set /P c=Continue?[Y/N]?
if /I "%c%" EQU "Y" goto :yes
if /I "%c%" EQU "N" goto :no
goto :choice

:yes

pip3 install jodel_api
pip3 install requests
npm install
pause
exit

:no

echo "Okay, bye."
exit