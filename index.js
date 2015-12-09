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

app.get('/movies/new', function(request, response) {

  response.render('new');

});

app.get('/movies/:id/edit', function(request, response) {

  // response.render('edit');
  movieId = request.params.id;

  //retrieve the movie from mongodb
  Movie.findById(movieId, function(err, movie) {
    if (err) return console.log(err);

    response.render('edit', {
      'movie': movie
    });
    // response.json(movie);
  });

});

app.get('/movies', function(req, res) {
  Movie.find()
    .select('title year_of_release rating')
    .exec(function(err, movies) {
      if (err) {
        console.log(err);
      } else {
        res.render('index', {
          'movies': movies
        });
        // res.json(movies);
      }
    });
});



app.post('/movies', function(req, res) {
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

    response.render('detail', {
      'movie': movie
    });
    // response.json(movie);
  });
});


function updateMovie(method, request, response) {
  movieId = request.params.id;
  userRating = request.body.rating;
  userTitle = request.body.title;

  //Update the movie from Mongodb
  Movie.findById(movieId, function(err, movie) {
    if (err) return console.log(err);

    movie.rating = userRating;
    movie.title = userTitle;
    movie.save(function(err, movie) {
      if (err) return console.log(err);
      if (method === 'POST') {
        response.json(movie);
      } else {
        res.redirect('/movies/' + movie._id);
      }
    });
  });
}

app.post('/movies/:id/edit', function(request, response) {
  updateMovie('POST', request, response);
  console.log('succesfully updated')
});

app.put('/movies/:id', function(request, response) {
  updateMovie('PUT', request, response);
});

function deleteMovie(method, request, response) {
  movieId = request.params.id;

  //Delete the movie from Mongodb
  Movie.remove({
    _id: movieId
  }, function(err) {
    if (err) return console.log(err);
    if (method === 'GET') {
      response.redirect('/movies');
    } else {
      response.send('Movie was deleted');
    }
  });
}

app.get('/movies/:id/delete', function(request, response) {
  deleteMovie('GET', request, response);
});

app.delete('/movies/:id', function(request, response) {
  deleteMovie('DELETE', request, response);
});

app.listen(8081, function() {
  console.log('server running on http://127.0.0.1:8081');
});
