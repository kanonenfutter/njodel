#from .jodel_api import JodelAccount
import pickle
import json
import os
import sys
from os.path import dirname
modulesDirname = os.path.dirname(os.path.realpath(__file__))
sys.path.append(modulesDirname)
import jodel_api



mode = eval(input("Hi. Neuen Account erstellen(1), den Standort eines bestehenden Accounts aktualisieren(2) oder bestehenden Account anzeigen(3)?"))


if mode==1:
	print("Angaben zum Ort. Tipp: http://www.latlong.net")
	lat = input("Latitude eingeben: ")
	lng = input("Longitude eigeben: ")
	city = input("City eingeben: ")
	j = jodel_api.JodelAccount(lat=lat, lng=lng, city=city)
	account = j.get_account_data()
	data = {}
	data['account']= account
	with open('data.json', 'w') as f:
		json.dump(data, f)
	print("Account in Datei 'data.json' gespeichert.")
if mode==2:
	# update location. Existing account needed.
	lat = input("latitude eingeben: ")
	lng = input("longitude eigeben: ")
	city = input("city eingeben: ")
	data = {}
	with open('data.json') as f:
		data = json.load(f)

	access_token = data['account']['access_token']
	expiration_date = data['account']['expiration_date']
	refresh_token = data['account']['refresh_token']
	distinct_id = data['account']['distinct_id']
	device_uid = data['account']['device_uid']
	print(data)
	j = jodel_api.JodelAccount(lat, lng, city, access_token, expiration_date, refresh_token, distinct_id, device_uid)
if mode==3:
	with open('data.json') as f:
		data = json.load(f)
		print(data)
