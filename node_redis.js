var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
var redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();

var sys = require("sys"),
    net = require("net");

// Redis Client
subscriber.subscribe("taskA");

app.listen(5000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  
  subscriber.on("message", function(channel, message) {
    console.log("Message '" + message + "' on channel '" + channel + "' arrived!");
      if(channel == "taskA"){
        publisher.get("A", function(err, reply){
          socket.emit('news', { hello: reply });
              console.log(reply);
        });
      }
  });

});
