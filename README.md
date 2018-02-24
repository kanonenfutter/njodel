# njodel




![](http://image.ibb.co/hfv2mQ/njodel3.jpg)

## Features
* Display most recent, replied and voted Jodels.
* Search for hashtags.
* Highlight OJ's replies.
* See the Repliers ID.
* Use Jodel on a desktop pc or in any modern webbrowser.
* Change your location easily.
* Dark theme.



## Requirements

* Node.js (npm@5.6.0 only supports version 4.8.7 or newer)
* [jodel_api](https://github.com/nborrmann/jodel_api) by [nborrmann](https://github.com/nborrmann)
* Python 3.x
* Python module [Requests](http://docs.python-requests.org/en/master/user/install/) `pip3 install requests` 




## Installation

1. Download or clone this repository and navigate to the root directory.
2. Run `npm install` to install the dependencies.
3. `pip3 install jodel_api requests`
4. Run `python3 jodel.py`(MacOS/Unix, or `py -3 jodel.py` on Windows), hit `1` and create an account by following the instructions.
5. To start the webserver, run `node ./bin/www` or `npm start`
6. Open `http://localhost:3000` in your browser


Or turn the website into a desktop application using this 
command line tool: [Nativefier](https://github.com/jiahaog/nativefier).
Recommended options: `nativefier "http://localhost:3000" --max-width 600px --min-width 400px`

## Quick Installation

### Windows:
* Run `setup.bat`: This script replaces steps 2. and 3. It also installs `requests` and `nodemon`.
* Run `jodel_account.bat` and hit `1` to create an account.
* Run `start.bat` to start the server.

### MacOS/Unix:
* Run `./setup.sh`: This script replaces steps 2. and 3. It also installs `requests` and `nodemon`.
* Create an account and start the server. See step 4-6 above.





## Coming features
- Send replies. (very unlikely.)



## Issues
- Infinite scroll sometimes acts really weird or not at all.

## Notes

### Authentication

You need to generate a Jodel account before first use. Follow the installation instructions.


### Change your location
Run `python/jodel.py` or use the website.

### Account Revalidation
You account's access tokens expires after a while. Revalidate your account by running `jodel_account.bat`, `python/jodel.py` or use the website.


## Disclaimer
This project is not affiliated with, endorsed or sponsored by The Jodel Venture GmbH.

## License

```
MIT License

Copyright (c) 2017 Vanakh Chea

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
