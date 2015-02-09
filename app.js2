var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').createServer(app);
var port = 3000;
server.listen(port);
console.log('Socket.io Server listening on http://127.0.0.1: '+ port);

var sio = require('socket.io').listen(server);
sio.sockets.on('connection',function(socket){
console.log('Connected to Web client');


//Taken from Mozilla Developer Center page
//Random number in the range min to max is given by Math.random*(max-min)+min
//here min=5 and max=10
var random_no = Math.floor((Math.random() * 5) + 5); 
setInterval(function(){
socket.emit('ss-ping',{text:'PING'});  //emit ping message
},random_no*1000);

//reception of PONG message from client is being displayed on server-console
socket.on('cc-pong',function(data){
console.log('Received '+ data.text + ' message from Client');  
});

//server gets PING message from client
socket.on('cc-ping',function(data){
socket.emit('ss-pong',{text:'PONG'});  //send back a pong response upon reception of ping message
console.log('Received PING message from Client');
});  

socket.on('disconnect',function(){
console.log('Disconnected from Web Client');
});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
