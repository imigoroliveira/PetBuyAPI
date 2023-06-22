var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./database/mongodb');
var indexRouter = require('./routes/index');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require("./swagger.json");


var LoginRouter = require('./routes/LoginRouter');
var clientRouter = require('./routes/ClientRouter');
var categoryRouter = require('./routes/CategoryRouter');
var productRouter = require('./routes/ProductRouter');
var orderRouter = require('./routes/OrderRouter');

var app = express();

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/auth', LoginRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
