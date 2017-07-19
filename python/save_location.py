import json
import os
import sys, getopt
from os.path import dirname
import jodel_api

#Intended usage: via node.js' module 'python-shell'. See localhost:3000/config
def main(argv):
	#store command line arguments in variables
	city = sys.argv[1]
	lat = sys.argv[2]
	lng = sys.argv[3]
	data = {}
	#load account data
	file_path = os.path.join(os.path.dirname(__file__),"data.json")
	with open(file_path) as f:
		data = json.load(f)

	access_token = data['account']['access_token']
	expiration_date = data['account']['expiration_date']
	refresh_token = data['account']['refresh_token']
	distinct_id = data['account']['distinct_id']
	device_uid = data['account']['device_uid']
	#init jodel client with new location
	j = jodel_api.JodelAccount(lat=lat, lng=lng, city=city, access_token=access_token, expiration_date=expiration_date, refresh_token=refresh_token, distinct_id=distinct_id, device_uid=device_uid, is_legacy=True)
	account = j.get_account_data()
	data = {"location_dict": {"loc_accuracy": 0.0, 
                "city": city, 
                "loc_coordinates": {"lat": lat, "lng": lng}, 
                "country": "DE", 
                "name": city}}
	data['account']= account
	#store account data
	with open(file_path, 'w') as f:
		json.dump(data, f)

if __name__ == "__main__":
	main(sys.argv[1:])