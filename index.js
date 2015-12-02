var http = require('http');
var dispatch = require('dispatch');
//Include Mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-aardvark');

//Express
var express = require('express');
var app = express();

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
	next();
});

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

app.get('/movies/:id', function(request, response) {
  var movieId = request.params.id;

	//retrieve the movie from mongodb
	Movie.findById(movieId, function (err, movie) {
		if (err) return console.log(err);

		response.json(movie);
	});
});


app.listen(8081, function() {
    console.log('server running on http://127.0.0.1:8081');
});
