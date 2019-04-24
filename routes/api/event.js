const express = require('express');
const router = express.Router();
const eventModel = require('../../models/eventSchema.js')
const mongoose = require('mongoose');

router.post('/event', function(req, res, next) {
  const event = new eventModel({
    title: req.body.title,
    description: req.body.description,
    place: req.body.place,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate
  });
  event.save((err, result) => {
    if (err) {
      console.log('error ' + err);
      return next(err);
    }
    res.send({'message':'event added successfully'})
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
