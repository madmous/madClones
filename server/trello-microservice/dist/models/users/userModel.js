'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _organizationModel = require('../organizations/organizationModel');

var _boardStarModel = require('../boardStars/boardStarModel');

var _boardModel = require('../boards/boardModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = exports.UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  fullname: {
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
  },
  boards: [_boardModel.BoardSchema],
  organizations: [_organizationModel.OrganizationSchema],
  boardStars: [_boardStarModel.BoardStarSchema]
});

UserSchema.pre('save', function (callback) {
  var userName = this;

  if (this.isModified('password') || this.isNew) {
    _bcrypt2.default.genSalt(10, function (err, salt) {
      if (err) {
        return callback(err);
      }
      _bcrypt2.default.hash(userName.password, salt, function (err, hash) {
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
  _bcrypt2.default.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

exports.default = _mongoose2.default.model('User', UserSchema);