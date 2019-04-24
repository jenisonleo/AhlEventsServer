const express = require('express');
const router = express.Router();
const eventModel = require('../../models/eventSchema.js')
const mongoose = require('mongoose');
const {getToken, isUser, isAdmin} = require('../auth.js')

router.post('/event', isAdmin, async function(req, res) {
  const event = {
    title: req.body.title,
    description: req.body.description,
    place: req.body.place,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate
  }
  await eventModel.create(event)
  res.send({message:'event added successfully'})
});

router.get('/events', isUser, async function(req, res) {
  const events = await eventModel.find({});
  res.send(events);
})

router.put('/event/:id', isAdmin, async function(req, res) {
  await eventModel.updateOne({_id: req.params.id},{
    $set:{
      title: req.body.title,
      description: req.body.description,
      place: req.body.place,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate
    }
  });
  res.send({message: 'Event updated'});
})

router.delete('/event/:id', isAdmin, async function(req, res) {
  await eventModel.findByIdAndRemove(req.params.id)
  res.send({message:'Event deleted'})
})

module.exports = router;
