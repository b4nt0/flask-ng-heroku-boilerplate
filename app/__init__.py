import logging
from flask import Flask
from flask_restful import Api

app = Flask(__name__)
app.config.from_object('config')

api = Api(app)

stream_handler = logging.StreamHandler()
app.logger.addHandler(stream_handler)

from app import models, todo_api

