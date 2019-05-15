const mongoose = require('mongoose')

const Schema = mongoose.Schema

var infoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('Infos', infoSchema)
