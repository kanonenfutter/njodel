import json
import os
import sys, getopt
from os.path import dirname
import jodel_api

def main():
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
	j = jodel_api.JodelAccount(lat="123", lng="123", city="city", update_location=False, access_token=access_token, expiration_date=expiration_date, refresh_token=refresh_token, distinct_id=distinct_id, device_uid=device_uid)
	j.refresh_access_token()
	account = j.get_account_data()
	#data = {}
	data['account']= account
	with open(file_path, 'w') as f:
		json.dump(data, f)

if __name__ == "__main__":
   main()