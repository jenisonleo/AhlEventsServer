const express = require('express')
const router = express.Router()
const infoModel = require('../../models/infoSchema.js')
const { isUser, isAdmin } = require('../auth.js')

router.post('/info', isAdmin, async function (req, res, next) {
  const info = {
    title: req.body.title,
    description: req.body.description,
    createdAt: +new Date()
  }
  await infoModel.create(info)
  res.send({ message: 'info added successfully' })
})

router.get('/infos', isUser, async function (req, res) {
  const infos = await infoModel.find({})
  res.send(infos)
})

router.put('/info/:id', isAdmin, async function (req, res) {
  await infoModel.updateOne({ _id: req.params.id }, {
    $set: {
      title: req.body.title,
      description: req.body.description
    }
  })
  res.send({ message: 'Info updated' })
})

router.delete('/info/:id', isAdmin, async function (req, res) {
  await infoModel.findByIdAndRemove(req.params.id)
  res.send({ message: 'Info deleted' })
})

module.exports = router
