import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  fullname: {
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
  },
  application: {
    type: String
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
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

UserSchema.methods.arePasswordsMatching = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};


export default mongoose.model('User', UserSchema);