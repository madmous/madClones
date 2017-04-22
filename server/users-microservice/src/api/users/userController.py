from flask_restful import Resource

class UserController(Resource):
    
    def get(self):
        from api.users.userModel import UserModel

        user_schema = UserSchema(many=True)
        result = user_schema.dump(list(UserModel.query.all()))

        return result.data, 200