
var rpc = require('jsonrpc2');
var server = new rpc.Server();

var arduino = require('duino');
var board = new arduino.Board({
    device: 'ACM'
});

var initLcd = function() {
    var lcd = new arduino.LCD({
        board: board,
        pins: {
            rs: 2,
            rw: 4,
            e: 3,
            data: [5, 6, 7, 8]
        }
    });
    lcd.begin(20, 2);
    lcd.clear();
    lcd.home();
    
    return function(message) {
        // set cursor to 0,0
        lcd.home();
        lcd.clear();
        lcd.setCursor(0,0);
        // print 20 chars
        message +='';
        var line1 = message.substring(0,20);
        lcd.print(line1);
        // set cursor to 0,1
        lcd.setCursor(0,1);
        // print 20 chars
        var line2 = message.substring(20,40);
        lcd.print(line2);
    }
}

var printFunction = function(message, callback) {
    callback('LCD Not Ready');
};
board.on('ready', function() {
    var printLcd = initLcd();

    printFunction = function(message, callback) {
        printLcd(message);
        callback(true);
    };
});

server.expose('print', function(args, opt, callback) {
    printFunction(args[0], function(result) {
        callback(null, result);
    });
});
server.listen(8000, '0.0.0.0');

