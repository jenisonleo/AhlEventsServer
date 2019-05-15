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
  birthDate: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('Users', userSchema)
