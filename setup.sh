#!/bin/bash
echo "This script will execute the following tasks:"
echo "* Installing python modules: requests and jodel_api"
echo "* Installing nodemon and the dependencies listed in 'packages.json'"
echo "-- Make sure that node.js and Python 3.x are installed. --"
echo "Continue? Enter a number."
select yn in "Yes" "No"; do
    case $yn in
        Yes )
			pip3 install jodel_api
			pip3 install requests
			npm install nodemon -g
			npm install
			break
			;;
        No ) exit;;
    esac
done