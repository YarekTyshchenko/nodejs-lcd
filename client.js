var rpc = require('jsonrpc2');
var client = new rpc.Client(8000, 'localhost');
client.call('print', ['Hello2'], function(err, result) {
    console.log(result);
});
