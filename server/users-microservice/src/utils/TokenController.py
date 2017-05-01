from datetime import datetime

import uuid
import jwt

from config.config import jwtSecret

class TokenController:
    
    def generateToken(name, email):
        token_identifier = str(uuid.uuid4()) + str(uuid.uuid4());

        payload = {
            'iss': 'users_microservice',
            'sub': 'user_token',
            'csrf': token_identifier,
            'iat': datetime.now(),
            'userName': name,
            'userEmail': email,
        }

        token = jwt.encode(payload, jwtSecret, 'HS256')

        csrf =  {
            'csrf': token_identifier
        }

        return {
            'token': token,
            'csrf': csrf
        }

    def decodeToken(token):
        options = {
            'verify_exp': False,
            'verify_aud': False,
            'verify_iat': False
        }

        return jwt.decode(token, key=jwtSecret, options=options)
