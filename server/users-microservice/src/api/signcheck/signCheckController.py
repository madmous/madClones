from flask_restful import Resource
from flask import jsonify, request

import jwt

from config.config import jwtSecret

class SignCheckController(Resource):
    
    def get(self):
        if 'jwt' in request.headers and 'csrf' in request.headers:
            token = request.headers['jwt']

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
        else:
            response = jsonify(message = 'Token and or Cookie missing')
            response.status_code = 401

            return response