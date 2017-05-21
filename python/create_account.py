import json
import os
import sys, getopt
from os.path import dirname
modulesDirname = os.path.dirname(os.path.realpath(__file__))
sys.path.append(modulesDirname)
import jodel_api

#Intended usage: via node.js' module 'python-shell'. See localhost:3000/config
def main(argv):
	#store command line arguments in variables
	city = sys.argv[1]
	lat = sys.argv[2]
	lng = sys.argv[3]
	data = {}

	j = jodel_api.JodelAccount(lat=lat, lng=lng, city=city)
	account = j.get_account_data()
	data = {"location_dict": {"loc_accuracy": 0.0, 
                "city": city, 
                "loc_coordinates": {"lat": lat, "lng": lng}, 
                "country": "DE", 
                "name": city}}
	data['account']= account
	#store account data
	with open('data.json', 'w') as f:
		json.dump(data, f)

if __name__ == "__main__":
   main(sys.argv[1:])