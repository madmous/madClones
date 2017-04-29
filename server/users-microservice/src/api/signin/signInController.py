from flask_restful import Resource
from datetime import datetime
from flask import jsonify, request

import uuid
import jwt

from models.userModel import UserModel
from config.config import jwtSecret

class SignInController(Resource):
    
    def post(self):
        auth = request.authorization
        user = UserModel.query.filter_by(name=auth.username).first()

        if user is None:
            data =  {
                'uiError': {
                    'usernameErr': 'There is not an account for this username'
                }
            }

            response = jsonify(data=data)
            response.status_code = 401

            return response
        else:
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

                data =  {
                    'csrf': token_identifier
                }

                response = jsonify(data=data)
                response.status_code = 200
                response.set_cookie('jwt', value=token, httponly=True)

                return response
            else:
                data =  {
                    'uiError': {
                        'passwordErr': 'Invalid password'
                    }
                }

                response = jsonify(data=data)
                response.status_code = 401

                return response