var server_name = "http://127.0.0.1:3000/";
var server = io.connect(server_name);
console.log('Client Connected to server : ' + server_name);

server.on('ss-ping',function(data){  //reception of ping message from server,hence send back pong
server.emit('cc-pong',{text:'PONG'});
console.log('Received ' + data.text + ' message from Server:');
});

server.on('ss-pong',function(data){  //recepion of pong message,hence print it to web client console
console.log('Received ' + data.text + ' message from Server:');
});

$('#ping').click(function(){
server.emit('cc-ping',{text:'PING'});
});

