//Express
var express = require('express');
var app = express();
var cons = require('consolidate');
var http = require('http');

//Express Middleware
var bodyParser = require('body-parser');


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



//Include routes
var routes = require('./routes/movies');
app.use(routes);
// console.log(routes);
app.listen(8081, function() {
  console.log('server running on http://127.0.0.1:8081');
});
