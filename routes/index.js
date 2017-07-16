var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request-promise');
var fs = require("fs");
var PythonShell = require('python-shell');
var os = require('os');
var path = require('path');
var moment = require('moment');
moment().format();

console.log("os.platform: " + os.platform() + " os.release: " + os.release());
console.log(path.join(os.homedir(), 'AppData//Local//Programs//Python//'));


const host = 'https://api.go-tellm.com';

var headers = {
			'User-Agent': 'Jodel/4.37.2 Dalvik/2.1.0 (Linux; U; Android 7.1; P6000 Build/NDE63P)',
			'X-Client-Type': 'android_4.37.2',
			'X-Api-Version': '0.2',
			'Content-Type': 'application/json; charset=UTF-8',
			'Accept-Encoding': 'gzip',
			'X-Timestamp': moment().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
};


/* account contains accounts data and location_dict created in jodel.py */
var account;
var multicity_top_jodels;

/* Read account data */
try {
	account = JSON.parse(fs.readFileSync(__dirname + '/../python/data.json'));
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log('[Warning] data.json not found! Run jodel.py first!');
	} else {
		throw err;
	}
}
try {
	multicity_top_jodels = JSON.parse(fs.readFileSync(__dirname + '/../jodels.json'));
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log('[Warning] jodels.json not found! No jodels will be shown at <host>/multicity');
	} else {
		throw err;
	}
}
headers["Authorization"] = 'Bearer ' + account.account.access_token;

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('main_jodel', { title: 'njodel', mode: 'recent' });
});

/* Get jodels. Response: recent, most replied and voted jodels. */
//TODO: implement ressources for retrieving recent, most replied OR voted jodels.
var getPosts_options = {
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

router.get('/posts', function(req, res, next) {
	request(getPosts_options)
		.then(function (data){
			res.json(data);
		})
		.catch(function (err) {
			res.json(err.error);
		});

});

router.get('/posts/recent', function(req, res, next) {
	request(getPosts_options)
		.then(function (data){
			var results = {};
			results = {
				posts : data.recent
			};
			//console.log(results);
			res.json(results);
		})
		.catch(function (err) {
			console.log(err.error);
			res.json(err.error);
		});

});

router.get('/posts/replied', function(req, res, next) {
	request(getPosts_options)
		.then(function (data){
			var results = {};
			results = {
				posts : data.replied
			};
			console.log(results);
			res.json(results);
		})
		.catch(function (err) {
			console.log(err.error);
			res.json(err.error);
		});

});
router.get('/posts/voted', function(req, res, next) {
	request(getPosts_options)
		.then(function (data){
			var results = {};
			results = {
				posts : data.voted
			};
			console.log(results);
			res.json(results);
		})
		.catch(function (err) {
			console.log(err.error);
			res.json(err.error);
		});

});

/* Get older Jodel. To be called after calling GET /recent. */
// TODO: Rename this ressource
router.get('/posts/after/:after', function(req, res, next) {
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
			console.log(err.error);
			res.json(err.error);
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
			console.log(err.error);
			res.json(err.error);
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
			console.log(err.error);
			res.json(err.error);
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
			console.log(err.error);
			res.json(err.error);
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
			console.log(err.error);
			res.json(err.error);
		});
});

router.get('/multicity', function(req, res, next) {
	res.render('multicity', { title: 'njodel'});
});

router.get('/multicity/posts', function(req, res, next) {
	res.json(multicity_top_jodels);
});

router.get('/config', function(req, res, next) {
	//console.log(account);
	/* This might become obsolete soon */
	if (!account.location_dict) {
		console.log("No location stored.");
	}
	res.render('config', {account: account.account, location_dict: account.location_dict, title: 'njodel'});
});

/* Changes the account's location */
/* Notice: Change pythonPath to the correct path, which may be different on other Operating Systems.
   macOS: /usr/local/bin/python3 */
router.post('/config/location', function(req, res, next) {
	console.log(req.body);
	var options = {
		mode: 'text',
		args: [req.body.city, req.body.lat, req.body.lng]
	};
	if (os.platform() === 'darwin') {
	 	options['pythonPath'] = 'python3';
	}

	var pyshell = new PythonShell('./python/save_location.py', options);

	pyshell.on('message', function (message) {
	  // received a message sent from the Python script (a simple "print" statement)
	  console.log(message);
	});

	// end the input stream and allow the process to exit
	pyshell.end(function (err) {
	  if (err) throw err.stack;
	  console.log('finished');
	});
});

// router.post('/config/', function(req, res, next) {
// 	console.log(req.body.city);
// 	var options = {
// 		mode: 'text',
// 		args: [req.body.city, req.body.lat, req.body.lng]
// 	};
// 	if (os.platform() === 'darwin') {
// 	 	options['pythonPath'] = 'python3';
// 	 	console.log("python3 set.");
		
// 	}

// 	pythonshell.run('./python/create_account.py', options, function(err, results){
// 		if (err) throw err;
// 		console.log('results: %j', results);
// 	});
// });

module.exports = router;
