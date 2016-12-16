var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs =require('express-handlebars');
// var tools = require('.tools');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// var CounterSchema = Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });
// mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

// // create a model from that schema
// var counter = mongoose.model('counter', CounterSchema);

// // create a schema for our links
// var urlSchema = new Schema({
//   _id: {type: Number, index: true},
//   long_url: String,
//   created_at: Date
// });
// urlSchema.pre('save', function(next){
//   var doc = this;
//   // find the url_count and increment it by 1
//   counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
//       if (error)
//           return next(error);
//       // set the _id of the urls collection to the incremented value of the counter
//       doc._id = counter.seq;
//       doc.created_at = new Date();
//       next();
//   });
// });
// var Url = mongoose.model('Url', urlSchema);

//var url = 'mongodb://localhost:27017/test';
// mongoose.connect('mongodb://localhost/test');
// var Schema = new mongoose.Schema({
// 	num10 : Number,
// 	url1 : String,
// 	num58 : Number
// });
// var row = mongoose.model('user',Schema);
// app.get('/view',function(req,res){
// 	user.find({}.function(err,docs){
// 		if(err) res.json(err);
// 		else res.render('index',{users:docs});
// 	});
// });

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
