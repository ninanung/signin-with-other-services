var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectHistoryApiFallbsck = require('connect-history-api-fallback');
var session = require('express-session');
var qs = require('querystring');
var rs = require('randomstring');

var indexRouter = require('./routes/index');
const github = require('./routes/github');

var app = express();

const cors = require('cors');
app.use(cors({origin:"http://localhost:3000"}));

// view engine setup
app.set('view engine', 'html');
app.use(connectHistoryApiFallbsck())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/github', github);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// session
app.use(
  session({
    secret: rs.generate(),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(req.session)
});

module.exports = app;
