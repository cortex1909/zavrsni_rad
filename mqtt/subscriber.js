var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.1.20');
client.on('connect', function () {
    client.subscribe('temp')
    client.subscribe('humid')
});
console.log('Subsciber #1 is online!');
console.log('Receiving message...');
client.on('message', function (topic, message) {
	context = message.toString();
	console.log(context)
});