from marshmallow import Schema, fields, post_dump

class UserSchema(Schema):
    
    id = fields.Integer()
    name = fields.Str()
    fullname = fields.Str()
    initials = fields.Str()
    email = fields.Str()
    application = fields.Str()

    @post_dump(pass_many=True)
    def wrap(self, data, many):
        key = 'users' if many else 'user'
        
        return {
            key: data
        }