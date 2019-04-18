const express = require('express');
const router = express.Router();
const userModel = require.main.require('./models/userSchema.js')
const mongoose = require('mongoose');

router.post('/user', function(req, res, next) {
  const user = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password
  });
  user.save((err, result) => {
    if (err) {
      console.log('error ' + err);
      return next(err);
    }
    res.send({'message':'user added successfully'})
  })
})

module.exports = router;
