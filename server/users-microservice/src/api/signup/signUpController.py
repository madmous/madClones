from flask_restful import Resource
from datetime import datetime
from flask import jsonify, request

from utils.TokenController import TokenController
from api.users.UserSchema import UserSchema
from models.UserModel import UserModel
from config.config import trelloMicroserviceUrl

from config.config import jwtSecret
from models.index import db

import requests
import uuid
import json
import jwt

class SignUpController(Resource):
    
    def post(self):
        userToAdd = request.get_json()

        name = userToAdd['name']
        fullname = userToAdd['fullname']
        initials = userToAdd['initials']
        email = userToAdd['email']
        password = userToAdd['password']
        application = userToAdd['application']

        user = UserModel(name, fullname, initials, email, password, application)

        db.session.add(user)
        db.session.commit()

        user_schema = UserSchema(many=False)
        result = user_schema.dump(user)

        payload = {
            'name': name,
            'fullname': fullname,
            'email': email
        }

        headers = {'Content-type': 'application/json; charset=utf-8'}

        # TODO: dynamic request to the correct micro service. Put it in the body
        trello_response = requests.post(trelloMicroserviceUrl + '/api/v1/signup', data=json.dumps(payload), headers=headers)

        if trello_response.status_code == 200:
            tokens = TokenController.generateToken(name, email)

            print(tokens)

            response = jsonify(data=tokens['csrf'])
            response.status_code = 200
            response.set_cookie('jwt', value=tokens['token'], httponly=True)

            return response
        else:
            return jsonify(error='Something went wrong'), 401