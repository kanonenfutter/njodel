chcp 1252
@echo off
echo Dieses Skript wird die folgenden Aktionen durchf�hren:
echo F�r Python: Requests und jodel_api installieren
echo F�r node.js: nodemon und die in der packages.json aufgelisteten Module installieren
echo -- Stelle sicher, dass node.js und Python 3.x installiert sind. --
pause
pip3 install jodel_api
pip3 install requests
npm install nodemon -g
npm install
pause