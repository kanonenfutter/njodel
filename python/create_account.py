import json
import os
import sys, getopt
from os.path import dirname
modulesDirname = os.path.dirname(os.path.realpath(__file__))
sys.path.append(modulesDirname)
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
	with open('data.json', 'w') as f:
		json.dump(data, f)

if __name__ == "__main__":
   main(sys.argv[1:])