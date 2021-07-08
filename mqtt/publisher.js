var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.1.20');

client.on('connect', function () {
			console.log('Publisher is online!');
			setInterval(function () {
				sensor.read(11, 4, function (err, temperature, humidity) {

					if (!err) {
						client.publish('temp', 'Trenutna temperatura je: ' + temperature);
						client.publish('humid', 'Trenutna vlaznost zraka je: ' + humidity);

						console.log('Temperatura: ' + temperature + ' Vlaga: ' + humidity);
					} else {
						console.log('Desila se pogreska: ' + err);
					}
				})
				}, 5000);
			})