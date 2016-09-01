var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config.js');

var app = express();

var db = mongoose.connect(config.mongo.url, function(err) {
  if (err) {
    console.error('Could not connect to MongoDB.');
  }
  console.log('Connected to MongoDB.');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(config.server.distFolder, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.server.distFolder));

app.use('/api', require('./app/routes/api'));
app.use('/api', require('./app/routes/api_auth'));
app.use('/api', require('./app/routes/api_comment'));
app.use('/api', require('./app/routes/api_post'));
app.use('/api', require('./app/routes/api_user'));
app.use('/', require('./app/routes/angular'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: err.message
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});


module.exports = app;
