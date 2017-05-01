from flask_restful import Resource, Api
from flask import Flask

from config.database import dbURI, dbDevURI
from flask_cors import CORS

from api.signcheck.SignCheckController import SignCheckController
from api.signout.SignOutController import SignOutController
from api.signin.SignInController import SignInController
from api.signup.SignUpController import SignUpController
from api.users.UserController import UserController
from api.users.UserSchema import UserSchema

from models.index import db

from config.config import trelloMicroserviceUrl

import requests
import os

app = Flask(__name__)

if 'FLASK_ENV' in os.environ.keys() and os.environ['FLASK_ENV'] == 'prod':
    app.config['SQLALCHEMY_DATABASE_URI'] = dbURI
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = dbDevURI
    app.config['DEBUG'] = True

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False;

db.init_app(app)
db.app = app
db.create_all()

api = Api(app)
CORS(app, supports_credentials=True)

api.add_resource(UserController, '/')
api.add_resource(SignInController, '/signin')
api.add_resource(SignUpController, '/signup')
api.add_resource(SignOutController, '/signout')
api.add_resource(SignCheckController, '/signcheck')

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 3002)