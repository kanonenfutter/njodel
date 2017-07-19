import json
import os
import sys, getopt
from os.path import dirname
import jodel_api

def main(argv):
	city = sys.argv[1]
	lat = sys.argv[2]
	lng = sys.argv[3]
	j = jodel_api.JodelAccount(lat=lat, lng=lng, city=city)
	account = j.get_account_data()
	data = {"location_dict": {"loc_accuracy": 0.0, 
                "city": city, 
                "loc_coordinates": {"lat": lat, "lng": lng}, 
                "country": "DE", 
                "name": city}}
	data['account']= account
	#store account data
	file_path = os.path.join(os.path.dirname(__file__),"data.json")
	with open(file_path, 'w') as f:
		json.dump(data, f)

if __name__ == "__main__":
   main(sys.argv[1:])