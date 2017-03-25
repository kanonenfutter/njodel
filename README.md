# njodel

njodel ist ein einfacher Client für die Jodel API. Im Hintergrund läuft ein express.js-Webserver, der selbst eine restful API bereitstellt.

Der Client soll keineswegs die selben Funktionen wie die offizielle anbieten. Vorerst wurden und werden nur einige http-get Methoden implementiert. Die Resourcen wurden mittels Reverse Engineering ( [Ergebnisse](https://github.com/kanonenfutter/njodel/wiki)) ermittelt. Nur soviel sei gesagt: Traffic Capturing mit WireShark ist ein Heidenspaß ;-).

![](https://image.ibb.co/fg3RAa/Screen_Shot_2017_03_24_at_12_11_51.png)

## Features
* Display most recent, replied and voted Jodels.
* Search for hashtags. There is no need to spam the timeline. :)
* Highlight OJ's replies.
* Use Jodel on a desktop pc or in any modern webbrowser.



## Requirements

* Node.js
* [jodel_api](https://github.com/nborrmann/jodel_api) by [nborrmann](https://github.com/nborrmann)
* Python 3.x
* optional: nodemon



## Installation

- download or clone this repository
- navigate to the root directory
- run `npm install` to install the dependencies
- place `jodel_api.py` into the root directory
- run `python3 jodel.py`, hit `1` and create an account by following the instructions.
- To start the webserver, run: `nodemon app` or `node ./bin/www`
- open `http://localhost:3000` in your browser


Or turn the website into a desktop application using this <br>
command line tool: [Nativefier](https://github.com/jiahaog/nativefier).
Recommended options: `nativefier "http://localhost:3000" --max-width 600px --min-width 400px`



## Coming features

- Filter responses: Only show OJs responses?

- Done: Hashtagbrowser, e.g. display all Jodels containing #archiv

- Set a custom location: kind of...



## Notices

### Authentication

The authentication token "Bearer ..." in `/routes/index.js`  was generated on a real device. Please do not use it for harmful purposes. 

If the built-in access token (Bearer xxx) fails to work - Maybe due to excessive use ;-) - feel free to generate and use your own access token. Or use the Python script `jodel.py`
### Location
<s>You can't change the location yet. Since the built-in auth token is linked the location of the real device.</s> Use `jodel.py`.


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
