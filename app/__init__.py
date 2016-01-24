import logging
from flask import Flask
from flask_restful import Api

app = Flask(__name__)
app.config.from_object('config')

api = Api(app)

stream_handler = logging.StreamHandler()
app.logger.addHandler(stream_handler)


@app.after_request
def after_request(response):
    if app.debug:
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

from app import models, todo_api

