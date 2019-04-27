const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    enum: ["Match","Marriage"]
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
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('events', eventSchema);
