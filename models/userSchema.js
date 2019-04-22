const mongoose = require('mongoose')
require('mongoose-type-email')

const Schema = mongoose.Schema
var userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
		unique: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
		unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('Users', userSchema)
