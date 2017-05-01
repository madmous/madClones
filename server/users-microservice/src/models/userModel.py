from bcrypt import hashpw, checkpw, gensalt
from models.index import db

class UserModel(db.Model):

    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    fullname = db.Column(db.String(80), unique=True, nullable=False)
    initials = db.Column(db.String(10), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    application = db.Column(db.String(80), unique=False, nullable=False)

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
        self.password = hashpw(password.encode('UTF_8'), gensalt())

    def check_password(self, password):
        return checkpw(password.encode('UTF_8'), self.password.encode('UTF_8'))