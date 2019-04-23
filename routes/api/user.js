const express = require('express')
const router = express.Router()
const userModel = require('../../models/userSchema.js')
const mongoose = require('mongoose')
const {getToken, isUser} = require('../auth.js')
const FCM = require('fcm-push')
const serverkey = 'AAAAwHaMU80:APA91bHVoCmwXFE94wZRxVLE70uma08WkEosR1w6gwlQIXT-zvoSpzQsXHT9ARIp7S3fZZ9ikoe3O3lEjjTlHhXBzdJlnBRYXygG_7xSHh6wsn8pLJJ7t1LmRkazErNf06YSpGcKOenG'

router.post('/register', function(req, res, next) {
  console.log(req.body)
  const user = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password
  })
  user.save((err, result) => {
    if (err) {
      next(err)
    }
    res.send({'message':'user added successfully'})
  })
})

router.post('/login', async function(req, res, next) {
  const user  = await userModel.findOne({username: req.body.username , password: req.body.password}
                , { username:1, fullname:1 })
  if(user) {
    const token = getToken(user)
    const header = {
      'Authorization': token
    }
    res.header('Authorization',token)
    var fcm = new FCM(serverkey)
    var message = {
      to : 'cvyUoYgnz6U:APA91bHsk3UqleLs7pPg6lu7bCH3ud2Sk6kKeqYADDbooaaVhA--InbFWa--6EOsaFPIjQiMbrscoaE81_q1lP50UOhrjxS8y0PZ8ZZ5LLJtmRonsylLazL-Wxlu2xbFuBGgUYMzIbOM',
      collapse_key : 'somekey',
      data : {
        title : 'title',
        description : 'description'
      },
      notification : {
        title : 'Title of the notification',
        body : 'Body of the notification'
      }
    }
    fcm.send(message, function(err,response){
      if(err) {
        console.log("Something has gone wrong !")
      } else {
        console.log("Successfully sent with resposne :",response)
      }
      res.send({user})
    })
  } else {
    res.send({message:'wrong username or password',user: user})
  }
})

router.get('/users', isUser, async function (req, res, next) {
  const users = await userModel.find({})
  res.send(users)
})

module.exports = router
