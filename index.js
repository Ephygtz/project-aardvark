var http = require('http');
var dispatch = require('dispatch');
//Include Mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/terrific-tuesday');

//Create a schema
var pizzaSchema = mongoose.Schema({
	name: String,
	price: Number,
	created_at: {type: Date, default: Date.now()}
});


//Compile our model
var Pizza = mongoose.model('Pizza', pizzaSchema);

//using the model
var pizza = new Pizza({name: 'Vegetarian', price: 1000});

//create the document
pizza.save(function(err, pizza) {
	if(err){
		return console.error('Your Pizza wasnt saved: ', pizza);
	}
	console.log('Your pizza was succesfully saved');
});

var server = http.createServer(
			dispatch({
				'/' : function(request, response) {
						message = {
							type: 'customer',
							text: 'Hi, how are you'
						};
						response.writeHead(200, {
							'Content-type': 'application/json',
							'Access-Control-Allow-Origin': 'http://127.0.0.1:9000'
						});
						response.end(JSON.stringify(message));
						console.log('Visiting %s', request.url);
						response.end('This is the root');
				},
				
			})
		);

server.listen(8081, function () {
	console.log('server running on 127.0.0.1:8081');
});