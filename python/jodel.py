import json
import os
import sys
from os.path import dirname
#modulesDirname = os.path.dirname(os.path.realpath(__file__))
#sys.path.append(modulesDirname)
#now: install "jodel_api" via pip install jodel_api
import jodel_api



option = eval(input("Jodel Account Verwaltung:\n"+
	"---------------------------------------\n" +
	"(1) Neuen Account erstellen \n"+
	"(2) Den Standort eines bestehenden Accounts aktualisieren \n"+
	"(3) Bestehenden Account anzeigen\n"+
	"(4) Access Token aktualisieren\n"
	"Ziffer eingeben:"))


if option==1:
	print("\nBitte die Koordinaten zum Standort eingeben: Tipp: http://www.latlong.net\n")
	# lat = input("Latitude eingeben: ")
	# lng = input("Longitude eigeben: ")
	# city = input("Stadt eingeben: ")
	lat = 50.937531
	lng = 6.960279
	city = "Cologne"
	j = jodel_api.JodelAccount(lat=lat, lng=lng, city=city, is_legacy=False)
	account = j.get_account_data()
	data = {"location_dict": {"loc_accuracy": 0.0, 
                "city": city, 
                "loc_coordinates": {"lat": lat, "lng": lng}, 
                "country": "DE", 
                "name": city}}
	data['account']= account
	with open('data.json', 'w') as f:
		json.dump(data, f)
	print("Account in Datei 'data.json' gespeichert.")
if option==2:
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
	j = jodel_api.JodelAccount(lat=lat, lng=lng, city=city, access_token=access_token, expiration_date=expiration_date, refresh_token=refresh_token, distinct_id=distinct_id, device_uid=device_uid)
	account = j.get_account_data()
	data = {"location_dict": {"loc_accuracy": 0.0, 
                "city": city, 
                "loc_coordinates": {"lat": lat, "lng": lng}, 
                "country": "DE", 
                "name": city}}
	data['account']= account
	with open('data.json', 'w') as f:
		json.dump(data, f)
	print("Account in Datei 'data.json' gespeichert.")
if option==3:
	with open('data.json') as f:
		data = json.load(f)
	access_token = data['account']['access_token']
	expiration_date = data['account']['expiration_date']
	refresh_token = data['account']['refresh_token']
	distinct_id = data['account']['distinct_id']
	device_uid = data['account']['device_uid']
	print("\naccess_token: " + access_token + "\nexpiration_date: " + str(expiration_date) + "\nrefresh_token: " + refresh_token + "\ndistinct_id: " + distinct_id + "\ndevice_uid: " + device_uid)
	exit = input("\nPress any key ... ")
if option==4:
	with open('data.json') as f:
		data = json.load(f)
	access_token = data['account']['access_token']
	expiration_date = data['account']['expiration_date']
	refresh_token = data['account']['refresh_token']
	distinct_id = data['account']['distinct_id']
	device_uid = data['account']['device_uid']
	j = jodel_api.JodelAccount(lat="123", lng="123", city="city", update_location=False, access_token=access_token, expiration_date=expiration_date, refresh_token=refresh_token, distinct_id=distinct_id, device_uid=device_uid)
	j.refresh_access_token()
	account = j.get_account_data()
	#data = {}
	data['account']= account
	with open('data.json', 'w') as f:
		json.dump(data, f)