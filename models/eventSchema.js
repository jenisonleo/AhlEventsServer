const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Number,
    required: true,
  },
  toDate: {
    type: Number,
    required: true,
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('events', eventSchema);
