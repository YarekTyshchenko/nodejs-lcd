var rpc = require('jayson');

var client = rpc.client.http({
  port: 8000,
  hostname: 'lcd.yarekt.co.uk'
});


var send = function(message) {
message += '';
	client.request('print', [message], function(err, error, response) {
	  if(err) throw err;
	  console.log(response); // 2!
	});
}

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", function(text) {
    send(text);
});
