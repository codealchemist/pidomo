var serialport = require('serialport');
var express = require('express');

//INIT SERIALPORT
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyAMA0", {
  //parser: serialport.parsers.readline("\r"),
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
}, false);

var app = express();

//------------------------------------------------------------------------------
//ROUTES
/*
app.get('/', function(req, res){
  res.render('index');
});
*/

function setRoutes() {
  app.get('/:id/switch/:relay', function(req, res){
    var id = req.param('id');
    var relay = req.param('relay') || 1;
    res.json({"message": "DEVICE " + id + ", relay " + relay + " SWITCHED."});
    toggle(id, relay);
  });

  app.get('/:id/on/:relay', function(req, res){
    var id = req.param('id');
    var relay = req.param('relay') || 1;
    res.json({"message": "DEVICE " + id + ", relay " + relay + " TURNED ON."});
    turnOn(id, relay);
  });

  app.get('/:id/off/:relay', function(req, res){
    var id = req.param('id');
    var relay = req.param('relay') || 1;
    res.json({"message": "DEVICE " + id + ", relay " + relay + " TURNED OFF."});
    turnOff(id, relay);
  });
}
//------------------------------------------------------------------------------

function initApp() {
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/build'));
  var server = app.listen(3200, function() {
      console.log('PIDOMO SERVER listening on port %d', server.address().port);
  });

  setRoutes();
}

serialPort.open(function () {
  console.log('SERIALPORT OPEN');
  initApp();
});

//receive data
serialPort.on('data', function(data) {
  console.log('--> data received: ' + data);
});

//------------------------------------------------------------------------------

function send(command) {
  command += "\r";
  //command = new Buffer(command + "\r", 'utf8');
  serialPort.write(command, function(err, results) {
    //console.log('err ' + err);
    //console.log('results ' + results);
  });
}

function toggle(id, relay) {
  console.log('--> DEVICE SWITCH: ' + id + ", relay " + relay);
  var commandNumber = parseInt(relay, 10) * 3;
  var command = id + commandNumber;
  send(command);
}

function turnOn(id, relay) {
  console.log('--> DEVICE ON: ' + id + ", relay " + relay);
  //var command = id.toUpperCase();
  var commandNumber = 1;
  if (relay > 1) commandNumber += ( parseInt(relay, 10) - 1 ) * 3;
  var command = id + commandNumber;
  send(command);
}

function turnOff(id, relay) {
  console.log('--> DEVICE OFF: ' + id + ", relay " + relay);
  //var command = id.toLowerCase();
  var commandNumber = 2;
  if (relay > 1) commandNumber += ( parseInt(relay, 10) - 1 ) * 3;
  var command = id + commandNumber;
  send(command);
}

function testLeds() {
  var led = 'a',
      maxIterations = 9,
      iterations = 0;
  serialPort.open(function () {
    console.log('open');
    serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });

    var intervalRef = setInterval(function(){
      toggle(led);

      //loop leds
      switch (led) {
          case 'a':
            led='b';
          break;

          case 'b':
            led='c';
          break;

          case 'c':
            led='a';
          break;
      }

      ++iterations;
      if (iterations === maxIterations) {
        clearInterval( intervalRef );
      }
    }, 1000 * 2);
  });
}

function test() {
  console.log('TEST running...');

  //toggle led c --> ON
  toggle('c');

  setTimeout(function(){
    toggle('c'); //--> OFF

    setTimeout(function(){
      turnOn('c');

      setTimeout(function(){
        turnOff('c');
      }, 1000 * 2);
    }, 1000 * 2);
  }, 1000 * 2);
}

function testRelay2() {
  console.log('TEST relay 2...');
  send('a4');
  setTimeout(function() {
    send('a5');
  }, 2000);
}

