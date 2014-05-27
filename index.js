var serialport = require('serialport');
var express = require('express');

//INIT SERIALPORT
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyAMA0", {
  //parser: serialport.parsers.raw,
  //parser: serialport.parsers.readline("\r"),
  baudrate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

//INIT APP
var app = express();
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/src'));
var server = app.listen(3200, function() {
    console.log('DOMO SERVER listening on port %d', server.address().port);
});

//receive data
serialPort.on('data', function(data) {
  console.log('--> data received: ' + data);
});

//------------------------------------------------------------------------------

//ROUTES
/*
app.get('/', function(req, res){
  res.render('index');
});
*/

app.get('/:id/switch', function(req, res){
  var id = req.param('id');
  res.json({"message": "DEVICE " + id + " SWITCHED."});
  toggle(id);
});

app.get('/:id/on', function(req, res){
  var id = req.param('id');
  res.json({"message": "DEVICE " + id + " TURNED ON."});
  turnOn(id);
});

app.get('/:id/off', function(req, res){
  var id = req.param('id');
  res.json({"message": "DEVICE " + id + " TURNED OFF."});
  turnOff(id);
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

function toggle(id) {
  console.log('--> DEVICE SWITCH: ' + id);
  send(id);
}

function turnOn(id) {
  console.log('--> DEVICE ON: ' + id);
  //var command = id.toUpperCase();
  var command = id + '1';
  send(command);
}

function turnOff(id) {
  console.log('--> DEVICE OFF: ' + id);
  //var command = id.toLowerCase();
  var command = id + '0';
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

