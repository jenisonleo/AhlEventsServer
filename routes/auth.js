const userModel = require('../models/userSchema.js')
const jwt = require('jsonwebtoken')
const SECRET = 'Secret8'


const getToken = async function (user) {
  const token = await jwt.sign({ _id: user._id},SECRET).toString()
  await userModel.updateOne({_id:user._id}, {$set:{ token: token}})
  return token
}

const isUser = async function(req, res, next) {
  const token = req.header('Authorization')
  if(token) {
    const user = await userModel.findOne({'token': token})
    if(user) {
      next()
    }
    else {
      res.send({message: "User not authorized, invalid token"})
    }
  }
}

module.exports = {getToken, isUser}
