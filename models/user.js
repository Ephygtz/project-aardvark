//Require mongoose
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

//define our schema
var userSchema = mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: String
});

//set plugin
userSchema.plugin(passportLocalMongoose);

//compile our model
module.exports = mongoose.model('User', userSchema);
