var mqtt = require('mqtt');

var count =0;
var client  = mqtt.connect("mqtt://localhost:1883",{clientId:"mqttjs01", username: "minhhvtptit@gmail.com"});
console.log("connected flag  " + client.connected);

//handle incoming messages
// xử lí các tin nhắn đến
client.on('message',function(topic, message, packet){
	console.log("message is "+ message);
	console.log("topic is "+ topic);
});


client.on("connect",function(){	
console.log("connected  "+ client.connected);

})

//handle errors
client.on("error",function(error){
	console.log("Can't connect" + error);
	process.exit(1)
});
//publish
function publish(topic,msg,options){
	console.log("publishing",msg);

	if (client.connected == true){
		client.publish(topic,msg,options);
	}
		//client.end();	
}

//////////////

var options={retain:true, qos:1};
var topic="testtopic1";
var message="on";
var topic_list=["topic2","topic3","topic4"];
var topic_o={"topic22":0,"topic33":1,"topic44":1};
console.log("subscribing to topics");

client.subscribe(topic,{qos:1}); //single topic
client.subscribe(topic_list,{qos:1}); //topic list
client.subscribe(topic_o); //object
var timer_id=setInterval(function(){publish(topic,message,options);},5000);
//notice this is printed even before we connect
console.log("end of script");