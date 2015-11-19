var http = require('http');
var dispatch = require('dispatch');
//Include Mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-aardvark');

//Express
var express = require('express');
var app = express();

//Express Middleware
var bodyParser = require('body-parser');

//define our schema
var movieSchema = mongoose.Schema({
        title: String,
        year_of_release: Number,
        category: String

    });
    //compile our model
var Movie = mongoose.model('Movie', movieSchema);


app.use(bodyParser.urlencoded({extended: true}));

app.get('/movies', function(req, res) {
	Movie.find(function(err, movies) {
		if (err) {
			console.log(err);
		}else {	
    res.json(movies);	
		}
	});
});

app.post('/movies/new', function(req, res) {
	console.log(req.body);
	formdata = req.body;
	 
	 var movie = new Movie(formdata);
	 movie.save(function(err, movie) {
	 	if(err) {
	 		console.log(err);
	 	} else {
	 		console.log('succesfully saved the movie');
	 		res.redirect('/movies');
	 	}
	 });
});


// var server = http.createServer(
//     dispatch({

        // '/movies': {

        //     'GET /': function(request, response, next) {
        //         movies = [{
        //                 title: 'Black Mass',
        //                 category: ['thriller', 'action', 'true-story'],
        //                 main_actors: [{
        //                     first_name: 'Johnny',
        //                     last_name: 'Depp'
        //                 }, {
        //                     first_name: 'Benedict',
        //                     last_name: 'Cumberbatch'


        //                 }]

        //             },

        //             {
        //                 title: 'Avengers: age of Ultron',
        //                 category: ['fanatsy', 'action'],
        //                 main_actors: [{
        //                     first_name: 'Chris',
        //                     last_name: 'Evans'


        //                 }, {
        //                     first_name: 'Robert',
        //                     last_name: 'Jr'



        //                 }]


        //             }, {
        //                 title: 'Straight-Outta-Compton',
        //                 category: ['drama', ''],
        //                 main_actors: [{
        //                     first_name: 'Oshea',
        //                     last_name: 'Jackson'



        //                 }, {

        //                     first_name: 'aldis',
        //                     last_name: 'Hodge'



        //                 }]


        //             }

        //         ];


        //         response.end(JSON.stringify(movies));
        //     },
        //     '/POST': function(request, response, next) {
        //         //get parameters from the form 
        //         var formdata = '';
        //         request.on('data', function(chunk) {
        //             formdata = querystring.parse(chunk.toString())

        //         });

//                 request.on('end', function() {
//                     console.log(formdata);
//                     //create an instance of a movie
//                     var movie = new Movie({
//                         title: formdata.title,
//                         year_of_release: formdata.year_of_release
//                     });





//                 })


//                 //inside this code we want to
//                 //1.create an instance of a movie 
//                 //syntax for creation of a new instance ...... var name = new name({})
//                 var movie = new Movie({
//                     title: formdata.title,
//                     year_of_release: formdata.year_of_release



//                 });

//             }


//         }
//     })
// );
// //Create a schema
// var pizzaSchema = mongoose.Schema({
// 	name: String,
// 	price: Number,
// 	created_at: {type: Date, default: Date.now()}
// });


// //Compile our model
// var Pizza = mongoose.model('Pizza', pizzaSchema);

 //using the model
// var pizza = new Pizza({name: 'Vegetarian', price: 1000});

//create the document
// pizza.save(function(err, pizza) {
// 	if(err){
// 		return console.error('Your Pizza wasnt saved: ', pizza);
// 	}
// 	console.log('Your pizza was succesfully saved');
// });

// var server = http.createServer(
// 			dispatch({
// 				'/' : function(request, response) {
// 						message = {
// 							type: 'customer',
// 							text: 'Hi, how are you'
// 						};
// 						response.writeHead(200, {
// 							'Content-type': 'application/json',
// 							'Access-Control-Allow-Origin': 'http://127.0.0.1:9000'
// 						});
// 						response.end(JSON.stringify(message));
// 						console.log('Visiting %s', request.url);
// 						response.end('This is the root');
// 				},

// 			})
// 		);

app.listen(8081, function() {
    console.log('server running on http://127.0.0.1:8081');
});
