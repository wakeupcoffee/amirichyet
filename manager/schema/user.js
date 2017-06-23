var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var emailRegex = '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/';

var UserSchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  username: {
    type: String,
    maxlength: 64,
    required: 'Username is required',
    unique: true
  },

  firstName: {
    type: String,
    maxlength: 64
  },

  lastName: {
    type: String,
    maxlength: 64
  }

  password: {
    type: String,
    required: 'Password is required',
    unique: true
  },

  email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  superUser: {
    type: Boolean,
    default: false
  },


});

var User = mongoose.model('User', UserSchema );

return User;