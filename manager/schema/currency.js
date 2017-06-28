var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CurrencySchema = new Schema({

  created: {
    type: Date,
    default: Date.now
  },

  name: {
    type: String,
    maxlength: 64,
    required: 'Name is required for this currency',
    unique: true
  },

  symbol: {
    type: String,
    maxlength: 16,
    required: 'Acronym is required for this currency',
    unique: true
  },

  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Currency', CurrencySchema );
