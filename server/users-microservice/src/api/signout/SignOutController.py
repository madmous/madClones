from flask_restful import Resource
from flask import jsonify

class SignOutController(Resource):
    
    def get(self):
        response = jsonify(data={'csrf': ''})
        response.status_code = 200
        response.set_cookie('jwt', value='', httponly=True)

        return response