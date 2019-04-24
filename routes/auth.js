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
    const user = await userModel.findOne({token: token},{username:1,email:1})
    if(user) {
      req.user = user
      next()
    }
    else {
      res.send({message: "User not authorized, invalid token"})
    }
  }
  else {
    res.send({message: "User not authorized, invalid token"})
  }
}

const isAdmin = async function(req, res, next) {
  const token = req.header('Authorization')
  if(token) {
    const user = await userModel.findOne({ $and:[{token: token},{admin: true}]})
    if(user) {
      next()
    }
    else {
      res.send({message: "User is not admin or invalid token"})
    }
  }
}

module.exports = {getToken, isUser, isAdmin}
