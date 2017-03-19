var express = require('express');
var router = express.Router();
var http = require('http');
const request = require('request-promise');

const host = 'https://api.go-tellm.com';

var headers = {
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
		headers: headers,
		json: true,
		method: 'GET',
		qs: {
			lat: 50.94129,
			lng: 6.95817
		}

	};
	request(options)
		.then(function (data){
			console.log(data.recent);
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});

});

router.get('/recent/:latitude/:longitude', function(req, res, next) {
	var recentJodels = '';
	var options = {
		uri: host + '/api/v3/posts/location/combo',
		headers: headers,
		json: true,
		method: 'GET',
		qs: {
			lat: latitude,
			lng: longitude
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

module.exports = router;
