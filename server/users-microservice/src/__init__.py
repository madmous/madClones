from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask import Flask, jsonify

from api.users.userSchema import UserSchema
from config.database import dbURI

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = dbURI
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
        self.password = password
        self.application = application

    def __repr__(self):
        return self.name

class UserController(Resource):
    
    def get(self):
        user_schema = UserSchema(many=True)
        result = user_schema.dump(list(UserModel.query.all()))

        return result.data, 200

api.add_resource(UserController, '/')

if __name__ == "__main__":
    app.run(host='0.0.0.0')