from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from flask import Flask, jsonify, request

from api.users.userSchema import UserSchema
from config.database import dbURI
from config.config import jwtSecret

import requests
import json
import jwt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = dbURI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False;

api = Api(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

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
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class UserController(Resource):
    
    def get(self):
        user_schema = UserSchema(many = True)
        result = user_schema.dump(list(UserModel.query.all()))

        return result.data, 200

class SignInController(Resource):
    
    def post(self):
        auth = request.authorization
        user = UserModel.query.filter_by(name = auth.username).first()

        if user is None:
            response = jsonify(error = 'There is not an account for this username')
            response.status_code = 404

            return response
        else :
            if user.check_password(auth.password):
                payload = {
                    'userName': user.name,
                    'userEmail': user.email
                }

                response = jsonify(token = jwt.encode(payload, jwtSecret, 'HS256'))
                response.status_code = 200

                return response
            else:
                response = jsonify(error = 'Invalid password')
                response.status_code = 404

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

        user_schema = UserSchema(many = False)
        result = user_schema.dump(user)

        return result.data, 200

class TestController(Resource):
    
    def get(self):
        payload = {'some': 'data'}
        t = requests.post('http://127.0.0.1:3001/api/v1/signup', data=payload)

        response = jsonify(data = 'Test')
        response.status_code = 200

        return response

api.add_resource(UserController, '/')
api.add_resource(TestController, '/test')
api.add_resource(SignInController, '/signin')
api.add_resource(SignUpController, '/signup')

if __name__ == '__main__':
    app.run(host = '0.0.0.0', debug = True, port = 80)