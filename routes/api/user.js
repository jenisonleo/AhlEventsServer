const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer")
const userModel = require('../../models/userSchema.js')
const mongoose = require('mongoose')
const {getToken, isUser} = require('../auth.js')
const fcmPush = require('fcm-push')
const bcrypt = require('bcrypt')
const saltRounds = 10;

async function sendRegistrationEmail(email, id) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  })
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'User Registerion',
    html: `<h2>Hi, Thanks for registering, please verify your account by clicking the link
    <a href='${process.env.DOMAIN}/api/verify-user/${id}' target='_blank'> verify </a> </h2>`
  })
  transporter.close()
}

router.post('/register', async function(req, res, next) {
  const hash = await bcrypt.hash(req.body.password, saltRounds)
  const user = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: hash
  }
  const existingUser = await userModel.findOne({ $or: [{email:{$eq: req.body.email}}, {username:{$eq: req.body.username}}]})
  if(!existingUser) {
    const registerUser = await userModel.create(user)
    const token = await getToken(registerUser)
    // await sendRegistrationEmail(req.body.email, registerUser._id)
    res.json({token:token,name:registerUser.fullname,email:registerUser.email,isAdmin:registerUser.admin,message:"User registered Successfully"})
  }
  else {
    if(existingUser.email === req.body.email) {
      res.status(401).send({message:"Email should be unique"})
    }
    else
      res.status(401).send({message:"Username should be unique"})
    }
})

router.get('/verify-user/:id', async function(req, res) {
  await userModel.updateOne({_id: req.params.id}, {$set: {verified: true}})
  res.send({message: 'User verified'})
})

router.post('/login', async function(req, res, next) {
  const user = await userModel.findOne({ $or:[{username: req.body.username}, {email:req.body.email}]})
  if(user) {
    const isRegisteredUser = await bcrypt.compare(req.body.password, user.password)
    if(isRegisteredUser) {
      const token = await getToken(user)
      res.json({token:token,name:user.fullname,email:user.email,isAdmin:user.admin,message:"login successful"})
    }
    else {
      res.status(403).send({message:'Wrong username or password'})
    }
  } else {
    res.status(403).send({message:'Wrong username or password'})
  }
})

router.post('/logout', isUser, async function(req, res, next) {
  await userModel.updateOne({_id: req.user._id}, {$set:{ token: null}})
  res.send({message:'Logged-out successfully'})
})

router.post('/username-checks', async function (req, res) {
  const user = await userModel.findOne({username:req.body.username})
  if(user)
    res.send({message:true})
  else
    res.send({message:false})
})

router.post('/email-checks', async function (req, res) {
  const user = await userModel.findOne({username:req.body.email})
  if(user)
    res.send({message:true})
  else
    res.send({message:false})
})

router.get('/users', isUser, async function (req, res, next) {
  const users = await userModel.find({})
  res.send(users)
})

router.get('/notify',function(req,res) {
  const serverkey = 'AAAAwHaMU80:APA91bHVoCmwXFE94wZRxVLE70uma08WkEosR1w6gwlQIXT-zvoSpzQsXHT9ARIp7S3fZZ9ikoe3O3lEjjTlHhXBzdJlnBRYXygG_7xSHh6wsn8pLJJ7t1LmRkazErNf06YSpGcKOenG'
  const fcm = new fcmPush(serverkey)
  const message = {
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
})

module.exports = router
