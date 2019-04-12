/**
 * http://usejsdoc.org/
 */

const mongoose=require('mongoose');
require('mongoose-type-email');

const Schema=mongoose.Schema;
var userSchema=new Schema({
								name:{type: String,required:true},
								email:{type:mongoose.SchemaTypes.Email,required:true},
								password:{type:String,required:true}
							});
module.exports= mongoose.model('Users',userSchema);
