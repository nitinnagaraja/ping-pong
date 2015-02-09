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
console.log('Server listening on http://127.0.0.1: '+ port);

var sio = require('socket.io').listen(server);

sio.set('origins', '*localhost:3000');

sio.sockets.on('connection', function(socket){
    console.log('Now connected to the client.');
    var rand = Math.floor((Math.random() * 5) + 5); 
	setInterval(function(){
		socket.emit('ss-ping',{text: 'ping'});
        console.log('server: sending ping!');
	}, rand * 1000);
	socket.on('cc-pong', function(data){
	    console.log('server: received pong!');
    });

    socket.on('cc-ping', function(data){
        socket.emit('ss-pong',{text:'pong'});
        console.log('server: received ping, sending pong!');
    });  

    socket.on('disconnect',function(){
        console.log('Disconnected from Web Client');
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
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
