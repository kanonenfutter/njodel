var express = require('express');
var router = express.Router();
var http = require('http');
const request = require('request-promise');

const host = 'https://api.go-tellm.com';

var headers = {
			'User-Agent': 'Jodel/4.37.5 Dalvik/2.1.0 (Linux; U; Android 7.1; P6000 Build/NDE63P)',
			'Authorization': 'INSERT YOUR KEY',
			'X-Client-Type': 'android_4.37.5',
			'X-Api-Version': '0.2',
			'Connection': 'Keep-Alive',
			'Accept-Encoding': 'gzip'
		};

var header2 = {
			'User-Agent': 'Jodel/4.37.5 Dalvik/2.1.0 (Linux; U; Android 7.1; P6000 Build/NDE63P)',
			'Authorization': 'INSERT YOUR KEY',
		};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'njodel' });
});


router.get('/recent', function(req, res, next) {
	var recentJodels = '';
	var options = {
		uri: host + '/api/v3/posts/location/combo',
		headers: header2,
		json: true,
		method: 'GET',
		qs: {
			lat: 50.94129,
			lng: 6.95817
		}

	};
	request(options)
		.then(function (data){
			console.log(data);
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});

});


function getRecent(){
	var options = {
		uri: host + '/api/v3/posts/location/combo',
		headers: header2,
		json: true,
		method: 'GET',
		qs: {
			lat: 50.8198311,
			lng: 6.8913095
		}

	};
	request(options)
		.then(function (res){
			console.log(JSON.stringify(res));
		})
		.catch(function (err) {
		// body...
		});

}

module.exports = router;
