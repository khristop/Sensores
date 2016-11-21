var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mongo
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sensores');

var db = mongoose.connection;


var index = require('./routes/index');
var users = require('./routes/users');


//mis rutas
var inicio = require('./routes/inicio');
var temperatura = require('./routes/temperatura');
var createPrueba = require('./routes/createPrueba');
//fin de mis rutas

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//apps para aplicacicon
app.use('/prueba', createPrueba);
app.use('/inicio', inicio);
app.use('/temperatura', temperatura);
//fin de apps

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


//puerto serial
var serialport = require('serialport');
var SerialPort = serialport;

//socket
var http = require("http");

var serv = http.createServer(app);
var io = require("socket.io").listen(serv);
serv.listen(8080, "127.0.0.1");
//socket io

io.on('connection', function (socket) {
  console.log("alguien se conecto");
  socket.on('disconnect', function () {
      console.log("alguien se desconecto")
  });
});

//puerto serial
var mySerial = new SerialPort("/dev/ttyACM0",{
    baudrate:115200,
    parser: serialport.parsers.readline("\n")
});

mySerial.on("open", function () {
  console.log("puerto abierto");
});

mySerial.on("data", function (dato) {
  console.log(dato);
  io.sockets.emit('lectura', dato);
  if (dato.localeCompare('Ready') != -1){
    mySerial.write('go',function () {
    });
  }
});

var livereload = require('livereload').createServer({
    exts:['js','css','jade']
});

livereload.watch(path.join(__dirname, 'views'));
livereload.watch(path.join(__dirname, 'public'));

//hasta aca
module.exports = app;
