#!/usr/bin/env node

var rpc = require('jayson');

var client = rpc.client.http({
  port: 8000,
  hostname: 'lcd.yarekt.co.uk'
});

var lcd = function(message) {
	client.request('print', [message], function(err, error, response) {
	  if(err) throw err;
	});
};

var args = process.argv.splice(2).join(' ');
if (args.length) {
	lcd(args);
} else {
	process.stdin.resume();
	var data = '';
	process.stdin.on('data', function(chunk) {
		data += chunk;
		if (data.length > 40) {
			data = data.slice(data.length - 40);
		}
	});
	process.stdin.on('end', function() {
		lcd(data);
	});
}