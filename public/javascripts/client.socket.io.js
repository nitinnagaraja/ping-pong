var server_name = "http://127.0.0.1:3000/";
var server = io.connect(server_name);
console.log('Client Connected to server : ' + server_name);

server.on('ss-ping', function(data){
server.emit('cc-pong',{text: 'pong'});
console.log('client: received ping, sending pong!');
});

server.on('ss-pong', function(data){
console.log('client: received pong!');
});

$('#Ping').click(function(){
server.emit('cc-ping',{text:'ping'});
});

