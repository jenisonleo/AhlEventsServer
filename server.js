const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const routes = require('./routes/routes')
app.use('/', routes)

const mongoose = require('mongoose')
const uri = 'mongodb://localhost/ahlevents'
mongoose.connect(uri, {
  useNewUrlParser: true
}, err => {
  if(err) {
    console.log('Mongo Error:', err)
  } else {
    console.log('Mongo connectin: success')
  }
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({'errors': {
    message: err.message
  }})
})

const port = 8002
app.listen(port, function() {
	console.log('Server running at http://127.0.0.1:'+port+'/')
})
