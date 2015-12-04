//Express
var express = require('express');
var cons = require('consolidate');
var app = express();
var http = require('http');

//Express Middleware
var bodyParser = require('body-parser');


//Include Mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-aardvark');


//Allow CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
  next();
});

//Express settings
app.engine('html', cons.liquid);

app.set('views', './views');
app.set('view engine', 'html');


//Express Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

//define our schema
var movieSchema = mongoose.Schema({
  title: String,
  year_of_release: Number,
  category: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 12
  }
});

//compile our model
var Movie = mongoose.model('Movie', movieSchema);


app.get('/movies', function(req, res) {
  Movie.find()
    .select('title year_of_release rating')
    .exec(function(err, movies) {
      if (err) {
        console.log(err);
      } else {
         res.render('index', {'movies': movies});
        // res.json(movies);
      }
    });
});

app.post('/movies/new', function(req, res) {
  console.log(req.body);
  formdata = req.body;

  var movie = new Movie(formdata);
  movie.save(function(err, movie) {
    if (err) {
      console.log(err);
    } else {
      console.log('succesfully saved the movie');
      res.redirect('/movies');
    }
  });
});

app.get('/movies/:id', function(request, response) {
  movieId = request.params.id;

  //retrieve the movie from mongodb
  Movie.findById(movieId, function(err, movie) {
    if (err) return console.log(err);

    response.render('detail', {'movie': movie});
    // response.json(movie);
  });
});

app.put('/movies/:id', function(request, response) {
  movieId = request.params.id;
  userRating = request.body.rating;

  //Update the movie from Mongodb
  Movie.findById(movieId, function(err, movie) {
    if (err) return console.log(err);

    movie.rating = userRating;
    movie.save(function(err, movie) {
      if (err) return console.log(err);

      // response.json(movie);
    });
  });
});

app.delete('/movies/:id', function(request, response) {
  movieId = request.params.id;

  //Delete the movie from Mongodb
  Movie.remove({
    _id: movieId
  }, function(err) {
    if (err) return console.log(err);

    response.send('movie was deleted');
  });
});

app.listen(8081, function() {
  console.log('server running on http://127.0.0.1:8081');
});
