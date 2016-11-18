const mongoose = require ('mongoose');
const bcrypt   = require ('bcrypt');

const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
	password: {
    type: String,
    required: true
  },
  initials: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});

UserSchema.pre('save', function (callback) {
  let userName = this;
  
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return callback(err);
      }
      bcrypt.hash(userName.password, salt, (err, hash) => {
        if (err) {
          return callback(err);
        }
        userName.password = hash;
        callback();
      });
    });
  } else {
    return callback();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);