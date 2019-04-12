/**
 * http://usejsdoc.org/
 */

const users=require('../models/login_model');
const app=require('../hello-world-server');
module.exports.te=function(req,res){
	console.log('name '+req.body.name)
	res.send("success");
};

module.exports.newuser=function(req,res){
	console.log('error '+req.body.name);
	let user = new users(
	        {
	            name: req.body.name,
	            email: req.body.email,
	            password: req.body.password
	        }
	    );
	console.log('error1 '+req.body.email);
	const collection = app.mongoClient.db("events").collection("users").save(user,(err,result) => {
        if (err) {
        	console.log('error '+err);
            return next(err);
        }
        res.send('user added successfully')
    })
}