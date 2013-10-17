var rpc = require('jsonrpc2');
var arduino = require('duino');
var board = new arduino.Board({
    //debug: true
});

var lcd = new arduino.LCD({
    board: board,
    pins: {
        rs: 2,
        rw: 4,
        e: 3,
        data: [5, 6, 7, 8]
    }
});

var printLcd = function(message) {
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

lcd.begin(20, 2);
lcd.clear();
lcd.home();

var server = new rpc.Server();

server.expose('print', function(args, opt, callback) {
    console.log(args);
    console.log(opt);
    printLcd(args[0]);
    callback(null, true);
});

server.listen(18000, '0.0.0.0');
