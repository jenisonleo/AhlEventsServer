const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var infoSchema = new Schema({
  title: {
    type: String,
    required: true,
    enum: ["Placement","Marriage"]
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Infos', infoSchema);
