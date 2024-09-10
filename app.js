var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sampleRouter = require('./routes/sample_data');

var app = express();

function clearFlashMessages(req, res, next) {
  req.flash();
  next();
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session and Flash middleware
// app.use(session({
//   secret: 'webslesson',
//   cookie: { maxAge: 60000 },
//   saveUninitialized: false,
//   resave: false
// }));
// app.use(flash());

// response.render('samples1', {
//   title: 'Nodejs Application',
//   action: "list",
//   Data: data.recordset,
//   message: request.flash(), // Pass all flash messages
//   formatDate: helpers.formatDate
// });

// Clear flash messages after flash middleware
// app.use(clearFlashMessages);

// Route handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sample', sampleRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// // Database connection (assuming you have a database.js file)
// const database = require('./database');
// database.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     process.exit(1);
//   }
//   console.log('SQL server connected successfully');
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


