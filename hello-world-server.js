var http = require('http');
const exp = require('express');
const login=require('./routes/login_routes');
const app=exp();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(exp.json());
app.use('/login',login);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jenisonleo:simonblack@ahaaevents-dolod.mongodb.net/events?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  // perform actions on the collection object
  console.log('success');
//  client.close();
});
module.exports.mongoClient=client;
let port=8002;
app.listen(port, function() {
	console.log('Server running at http://127.0.0.1:'+port+'/');
});


