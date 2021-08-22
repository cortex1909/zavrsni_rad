var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.1.16');

var temperature = 20
var humidity = 40

client.on('connect', function () {
			console.log('Publisher is online!');
			setInterval(function () {
				
						client.publish('temp', 'Trenutna temperatura je: ' + temperature);
						client.publish('humid', 'Trenutna vlaznost zraka je: ' + humidity);
						console.log(`Trenutna temperatura je: ${temperature}`);
						console.log(`Trenutna vlažnost je: ${humidity}`);
				}, 5000)
				});