chcp 1252
@echo off
echo Dieses Skript wird die folgenden Aktionen durchführen:
echo Für Python: Requests und jodel_api installieren
echo Für node.js: nodemon und die in der packages.json aufgelisteten Module installieren
echo -- Stelle sicher, dass node.js und Python 3.x installiert sind. --
pause
pip3 install jodel_api
pip3 install requests
npm install nodemon -g
npm install
pause