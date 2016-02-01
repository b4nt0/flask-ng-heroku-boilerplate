# Flask-Angular-Heroku-Boilerplate

This is a very simple boilerplate to start an
[Angular.js](http://www.angularjs.org) application with a
[Flask](http://flask.pocoo.org/) backend on the
[Heroku](https://www.heroku.com/) cloud.

The client side of the boilerplate is based on the [ngbp](https://github.com/ngbp/ngbp) project.

# To Start

```
$ git clone git://github.com/b4nt0/flask-ng-heroku-boilerplate
$ cd flask-ng-heroku-boilerplate
```

## Server side

* Install [Python 2.7](http://www.python.org)
* Create a virtual environment `virtualenv --python=python2.7 venv` and activate `source ./venv/bin/activate`
* Install server-side dependencies `pip install -r requirements.txt`

## Client side

* Install Node.js
* `npm install`

## Run

```
$ python ./run.py
```

and then navigate to http://localhost:5000/static/spa/index.html

# To Deploy on Heroku

This boilerplate is designed to be used with
[multiple buildpacks](https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app).
Use heroku/nodejs first and heroku/python second.