from flask_restful import Resource
from datetime import datetime
from flask import jsonify, request

import requests
import uuid
import json
import jwt

from utils.TokenController import TokenController
from models.UserModel import UserModel
from config.config import jwtSecret
from config.config import trelloMicroserviceUrl

class SignInController(Resource):
    
    def post(self):
        auth = request.authorization
        user = UserModel.query.filter_by(name=auth.username).first()

        if user is None:
            response = jsonify(data={
                'uiError': {
                    'usernameErr': 'There is not an account for this username'
                }
            })

            response.status_code = 401

            return response
        else:
            if user.check_password(auth.password):
                # TODO: dynamic request to the correct micro service. Put it in the body
                trello_response = requests.get(
                    trelloMicroserviceUrl + '/api/v1/signin', 
                    data=json.dumps({
                        'name': user.name,
                        'email': user.email
                    }), 
                    headers={'Content-type': 'application/json; charset=utf-8'}
                )

                if trello_response.status_code == 200:
                    tokens = TokenController.generateToken(user.name, user.email)

                    response = jsonify(data=tokens['csrf'])
                    response.status_code = 200
                    response.set_cookie('jwt', value=tokens['token'], httponly=True)

                    return response
                else:
                    response = jsonify(data={
                        'uiError': {
                            'usernameErr': 'This user is not registered in Trello Clone'
                        }
                    })

                    response.status_code = 401

                    return response
                    
            else:
                response = jsonify(data={
                    'uiError': {
                        'passwordErr': 'Invalid password'
                    }
                })

                response.status_code = 401

                return response