var arduino = require('duino');
var board = new arduino.Board({
    device: "ACM",
    debug: true
});

board.on('error', function() {
    console.log('error');
});

board.on("ready", function(){
    console.log("Done");

});
board.on("data", function(data){
    console.log(data);
});
