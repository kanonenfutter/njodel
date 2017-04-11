var express = require('express');
var router = express.Router();
var http = require('http');
const request = require('request-promise');
var fs = require("fs");

var moment = require('moment');
moment().format();

const host = 'https://api.go-tellm.com';

var headers = {
			'User-Agent': 'Jodel/4.37.5 Dalvik/2.1.0 (Linux; U; Android 7.1; P6000 Build/NDE63P)'
};


var account;

/* Read account data */
try {
	account = JSON.parse(fs.readFileSync(__dirname + '/../data.json'));
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log('data.json not found! Run jodel.py first!');
	} else {
		throw err;
	}
}
headers["Authorization"] = 'Bearer ' + account.account.access_token;

console.log(headers);

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('main_jodel', { title: 'njodel', mode: 'recent' });
});

/* Get recent jodels. Response: recent, most replied and voted jodels. */
router.get('/recent', function(req, res, next) {
	var recentJodels = '';
	var options = {
		uri: host + '/api/v3/posts/location/combo',
		headers: headers,
		json: true,
		method: 'GET',
		qs: {
			lat: '50.937531',
			lng: '6.960279',
			home: false,
			stickies: false
		}

	};
	request(options)
		.then(function (data){
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});

});

/* Get older Jodel. To be called after calling GET /recent. */
router.get('/recent/:after', function(req, res, next) {
	var recentJodels = '';
	var options = {
		uri: host + '/api/v2/posts/location/',
		headers: headers,
		json: true,
		method: 'GET',
		qs: {
			after: req.params.after,
			lat: '52.52001',
			lng: '13.40495',
			home: false
		}

	};
	request(options)
		.then(function (data){
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});

});

router.get('/replied', function(req, res, next) {
	res.render('main_jodel', { title: 'njodel', mode: 'replied' });
});

router.get('/voted', function(req, res, next) {
	res.render('main_jodel', { title: 'njodel', mode: 'voted' });
});

router.get('/newsfeed', function(req, res, next) {
	res.render('main_jodel', { title: 'njodel', mode: 'newsfeed' });
});

/* Telling the jodel server the location data does not affect the response */
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
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});

});

/* Render details page */
router.get('/details/:id', function (req, res, next) {
	res.render('detail_jodel', { title: 'njodel', id: req.params.id});
});
/* Render details page. Images Only. */
router.get('/details/:id/imagesonly', function (req, res, next) {
	res.render('detail_jodel_notext', { title: 'njodel', id: req.params.id});
});
/* Retrieve replies of Jodel #:id */
router.get('/posts/:id', function (req, res, next) {
	console.log(req.params.id);
	var data = '';
	var options = {
		uri: host + '/api/v3/posts/' + req.params.id + '/details',
		headers: headers,
		json: true,
		method: 'GET',
		qs: {
			reverse: false,
			details: true
		}

	};
	request(options)
		.then(function (data){
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});
});
/* Get newer jodels after jodel #:next */
router.get('/posts/:id/:next', function (req, res, next) {
	var data = '';
	var options = {
		uri: host + '/api/v3/posts/' + req.params.id + '/details',
		headers: headers,
		json: true,
		method: 'GET',
		qs: {
			reverse: false,
			details: false,
			reply: req.params.next
		}

	};
	request(options)
		.then(function (data){
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});
});
/* Render hashtags page */
router.get('/hashtags', function(req, res, next) {
	res.render('hashtags', { title: 'njodel', mode: 'hashtags' });
});
/* Retrieve jodels contains the hashtag :hashtag */
router.get('/hashtags/:hashtag', function (req, res, next) {
	var data = '';
	var options = {
		uri: host + '/api/v3/posts/hashtag/combo',
		headers: headers,
		json: true,
		method: 'GET',
		qs: {
			hashtag: req.params.hashtag,
			home: true
		}

	};
	request(options)
		.then(function (data){
			res.json(data);
		})
		.catch(function (err) {
			console.log(err);
			res.end();
		});
})

module.exports = router;
