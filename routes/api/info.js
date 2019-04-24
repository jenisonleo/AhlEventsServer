const express = require('express');
const router = express.Router();
const infoModel = require('../../models/infoSchema.js')
const mongoose = require('mongoose');

router.post('/info', function(req, res, next) {
  const info = new infoModel({
    title: req.body.title,
    description: req.body.description,
    createdAt: req.body.createdAt
  });
  info.save((err, result) => {
    if (err) {
      console.log('error ' + err);
      return next(err);
    }
    res.send({'message':'info added successfully'})
  })
});

/*router.get('/users', function(req, res,next) {
  //var User = mongoose.model('User',userModel);
  var query = userModel.find({},{username:1,_id:0});
  query.exec(function(err,usernames){
    if (err)
      return next(err);
    res.send(usernames);
    });
});*/

module.exports = router;
