

var redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();
 
subscriber.on("message", function(channel, message) {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!");
    if(channel == "taskA"){
	publisher.get("A", function(err, reply){
	    console.log(reply);
	});
    }
});


subscriber.subscribe("taskA");
 
