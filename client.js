var rpc = require('jsonrpc2');
var client = new rpc.Client(8000, 'lcd.yarekt.co.uk');
var send = function(message) {
message += '';
client.call('print', [message], function(err, result) {
    console.log(result);
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
