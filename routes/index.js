var express = require('express');
var router = express.Router();
var http = require('http');
const request = require('request-promise');

var moment = require('moment');
moment().format();

const host = 'https://api.go-tellm.com';

var headers = {
			'User-Agent': 'Jodel/4.37.5 Dalvik/2.1.0 (Linux; U; Android 7.1; P6000 Build/NDE63P)',
			'Authorization': 'Bearer 04272352-726d639e-88cfc995-38db-4cf2-a74b-1272ad4628d2',
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
			lat: '52.52001',
			lng: '13.40495',
			home: false,
			stickies: false
		}

	};
	request(options)
		.then(function (data){
			//console.log(data.recent);
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

router.get('/posts/:id', function (req, res, next) {
	// body...
	var data = '';
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
})

module.exports = router;
