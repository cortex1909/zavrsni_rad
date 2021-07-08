var mosca = require('mosca');
console.log("MQTT broker is ready to go online...");
var settings = {
	http: {
	  port: 1884,
	  bundle: true,
	  static: './'
	}
  }
console.log("Setting port: " + settings.http.port + "...");
var server = new mosca.Server(settings);
server.on('ready', function () {
	console.log("MQTT broker is online!");
});