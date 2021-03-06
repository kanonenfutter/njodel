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


const host = 'https://api.go-tellm.com';

var headers = {
			'User-Agent': 'Jodel/4.58.1 Dalvik/2.1.0 (Linux; U; Android 7.1; P6000 Build/NDE63P)',
			'X-Client-Type': 'android_4.58.1',
			'X-Api-Version': '0.2',
			'Content-Type': 'application/json; charset=UTF-8',
			'Accept-Encoding': 'gzip',
			'Connection': 'Keep-Alive', 
			'X-Timestamp': moment().utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
};


/* account contains accounts data and location_dict created in jodel.py */
var account;
var multicity_top_jodels;

load_account();

/* Read posts stored in /../jodels.json. */
try {
	multicity_top_jodels = JSON.parse(fs.readFileSync(__dirname + '/../jodels.json'));
} catch (err) {
	if (err.code === 'ENOENT') {
		console.log('[Warning] jodels.json not found! No posts will be shown at <host>/multicity');
	} else {
		throw err;
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('main_jodel', { title: 'njodel', mode: 'recent' });
});

/* Get posts. Response: recent, most replied and voted jodels. */
//TODO: implement ressources for retrieving recent, most replied OR voted posts.
var getPosts_options = {
	uri: host + '/api/v3/posts/location/combo',
	headers: headers,
	json: true,
	method: 'GET',
	qs: {
		lat: '50.937531',
		lng: '6.960279',
		home: true,
		stickies: false,
		skipHometown: false
	},
	gzip: true
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
			res.json(results);
		})
		.catch(function (err) {
			console.log("error:" + err.error);
			res.status(500).json({error: err.error});
		});

});

router.get('/posts/replied', function(req, res, next) {
	request(getPosts_options)
		.then(function (data){
			var results = {};
			results = {
				posts : data.replied
			};
			res.json(results);
		})
		.catch(function (err) {
			console.log("error:" + err.error);
			res.status(500).json({error: err.error});
		});

});
router.get('/posts/voted', function(req, res, next) {
	request(getPosts_options)
		.then(function (data){
			var results = {};
			results = {
				posts : data.voted
			};
			res.json(results);
		})
		.catch(function (err) {
			console.log("error:" + err.error);
			res.status(500).json({error: err.error});
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
		},
		gzip: true

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
		},
		gzip: true

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
		},
		gzip: true

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
/* Get newer posts after jodel #:next */
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
		},
		gzip: true

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
/* Retrieve posts contains the hashtag :hashtag */
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
		},
		gzip: true

	};
	request(options)
		.then(function (data){
			res.json(data);
		})
		.catch(function (err) {
			console.log("error:" + err.error);
			res.status(500).json({error: err.error});
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
	//Tell the requesting client the platform on which the server is running.
	var platform = os.platform();
	res.render('config', {account: account.account, location_dict: account.location_dict, title: 'njodel', platform: platform});
	
});

/* Changes the account's location */
router.post('/config/location', function(req, res, next) {
	console.log(req.body);
	var options = {
		mode: 'text',
		args: [req.body.city, req.body.lat, req.body.lng]
	};
	if (os.platform() === 'darwin') {
	 	options['pythonPath'] = 'python3';
	}
	if (os.platform() === 'win32') {
	 	options['pythonPath'] = 'py';
	 	options['pythonOptions'] = ['-3'];
	}

	var pyshell = new PythonShell('./python/save_location.py', options);

	pyshell.on('message', function (message) {
	  // received a message sent from the Python script (a simple "print" statement)
	  console.log(message);
	});

	// end the input stream and allow the process to exit
	pyshell.end(function (err) {
	  if (err) throw err.stack;
	  console.log('success!');
	  load_account();
	  res.end();
	});
});

/* Create a new account */
router.post('/config/', function(req, res, next) {
	console.log(req.body.city);
	var options = {
		mode: 'text',
		args: [req.body.city, req.body.lat, req.body.lng]
	};
	if (os.platform() === 'darwin') {
	 	options['pythonPath'] = 'python3';
	}
	if (os.platform() === 'win32') {
	 	options['pythonPath'] = 'py';
	 	options['pythonOptions'] = ['-3'];
	}

	var pyshell = new PythonShell('./python/create_account.py', options);

	pyshell.on('message', function (message) {
	  // received a message sent from the Python script (a simple "print" statement)
	  console.log(message);
	});

	// end the input stream and allow the process to exit
	pyshell.end(function (err) {
	  if (err) throw err.stack;
	  console.log('success!');
	  res.end();
	});
});

/* Refresh access token */
router.post('/config/access_token', function(req, res, next) {
	var options = {
		mode: 'text'
	};
	if (os.platform() === 'darwin') {
	 	options['pythonPath'] = 'python3';
	}
	if (os.platform() === 'win32') {
	 	options['pythonPath'] = 'py';
	 	options['pythonOptions'] = ['-3'];
	}

	var pyshell = new PythonShell('./python/refresh_token.py', options);

	pyshell.on('message', function (message) {
	  // received a message sent from the Python script (a simple "print" statement)
	  console.log(message);
	});

	// end the input stream and allow the process to exit
	pyshell.end(function (err) {
	  if (err) throw err.stack;
	  console.log('success!');
	  load_account();
	  res.end();
	});
});


function load_account() {
	/* Read account data */
	try {
		console.log("Loading account...")
		account = JSON.parse(fs.readFileSync(__dirname + '/../python/data.json'));
		headers["Authorization"] = 'Bearer ' + account.account.access_token;
		//console.log(headers);
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.log('[Warning] data.json not found! Run jodel.py first!');
		} else {
			throw err;
		}
	}
}

module.exports = router;
