chcp 1252
@echo off
echo Dieses Skript wird die folgenden Aktionen durchf�hren:
echo jodel_api.py herunterladen
echo F�r Python: Requests installieren
echo F�r node.js: nodemon und die in der packages.json aufgelisteten Module installieren
echo -- Stelle sicher, dass node.js und Python 3.x installiert sind. --
pause
powershell -Command "Invoke-WebRequest https://raw.githubusercontent.com/nborrmann/jodel_api/master/src/jodel_api.py -OutFile jodel_api.py"
pip3 install requests
npm install nodemon -g
npm install
pause