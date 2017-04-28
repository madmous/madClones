from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask import Flask, jsonify, request

from jwt.algorithms import HMACAlgorithm, RSAAlgorithm
from config.database import dbURI, dbDevURI
from config.config import jwtSecret
from datetime import datetime
from bcrypt import hashpw

from api.users.userSchema import UserSchema

import requests
import json
import uuid
import jwt
import os

app = Flask(__name__)

if 'FLASK_ENV' in os.environ.keys() and os.environ['FLASK_ENV'] == 'prod':
    app.config['SQLALCHEMY_DATABASE_URI'] = dbURI
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = dbDevURI
    app.config['DEBUG'] = True

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False;

api = Api(app)
db = SQLAlchemy(app)

class UserModel(db.Model):

    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    fullname = db.Column(db.String(80), unique=True, nullable=False)
    initials = db.Column(db.String(10), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    application = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, name, fullname, initials, email, password, application):
        self.name = name
        self.fullname = fullname
        self.initials = initials
        self.email = email
        self.application = application

        self.set_password(password)

    def __repr__(self):
        return self.name

    def set_password(self, password):
        self.password = hashpw(password.encode('UTF_8'), bcrypt.gensalt())

    def check_password(self, password):
        return password == self.password.decode()

class SignInController(Resource):
    
    def post(self):
        auth = request.authorization
        user = UserModel.query.filter_by(name=auth.username).first()

        if user is None:
            response = jsonify(error = 'There is not an account for this username')
            response.status_code = 404

            return response
        else :
            if user.check_password(auth.password):
                token_identifier = str(uuid.uuid4()) + str(uuid.uuid4());

                payload = {
                    'iss': 'users-microservice',
                    'sub': 'user_token',
                    'csrf': token_identifier,
                    'iat': datetime.now(),
                    'userName': user.name,
                    'userEmail': user.email,
                }

                token = jwt.encode(payload, jwtSecret, 'HS256')

                response = jsonify(token=token_identifier)
                response.status_code = 200
                response.set_cookie('jwt', value=token, httponly=True)

                return response
            else:
                response = jsonify(message='Invalid password')
                response.status_code = 404

                return response

class SignCheckController(Resource):
    
    def get(self):
        token = request.cookies['jwt']

        options = {
            'verify_exp': False,
            'verify_aud': False,
            'verify_iat': False
        }

        decoded_token = jwt.decode(token, key=jwtSecret, options=options)

        if decoded_token['csrf'] == request.headers['csrf']:
            response = jsonify(name=decoded_token['userName'], email=decoded_token['userEmail'])
            response.status_code = 200

            return response
        else:
            response = jsonify(message = 'The token is not valid')
            response.status_code = 401

            return response

class SignUpController(Resource):
    
    def post(self):
        name = request.form['name']
        fullname = request.form['fullname']
        initials = request.form['initials']
        email = request.form['email']
        password = request.form['password']
        application = request.form['application']

        user = UserModel(name, fullname, initials, email, password, application)

        db.session.add(user)
        db.session.commit()

        user_schema = UserSchema(many=False)
        result = user_schema.dump(user)

        return result.data, 200

class UserController(Resource):
    
    def get(self):
        user_schema = UserSchema(many=True)
        result = user_schema.dump(list(UserModel.query.all()))

        return result.data, 200

class TestController(Resource):
    
    def get(self):
        #payload = {'some': 'data'}
        #t = requests.post('http://trello-microservice:80/api/v1/signup', data = payload)
        # t = requests.post('http://localhost:3001/api/v1/signup', data = payload) // TODO env variable

        return jsonify(uuid.uuid4())

api.add_resource(UserController, '/')
api.add_resource(TestController, '/test')
api.add_resource(SignInController, '/signin')
api.add_resource(SignUpController, '/signup')
api.add_resource(SignCheckController, '/signcheck')

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 3002)