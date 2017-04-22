from index import db

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