#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('services:server');
var http = require('http');

var https = require('https');
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

// var privateKey = fs.readFileSync('/var/www/ssl/illtipadmin.com.key', 'utf8');
// var certificate = fs.readFileSync('/var/www/ssl/3147b3b3825543af.crt', 'utf8');
// var credentials = {
//   key: privateKey,
//   cert: certificate
// };

// var server = https.createServer(credentials, app);
var server = http.createServer(app);

// var server = http.createServer(app).listen(port, function () {
//   console.log('Express HTTP server listening on port ' + port);
// });

// https.createServer(credentials, app).listen(3000, function () {
//   console.log('Express HTTPS server listening on port ' + 3000);
// });

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  console.log('Listening on ' + bind);
}

/**
 * Connection to MongoDB
 */

if (config.dbAccess == 'server') {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  var db = config.database['server'];

  // var connectionString = "mongodb://" + db.username + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.dbName + "?authSource=" + db.authDb + "&ssl=true";
  // mongoose.connect(connectionString)

  // mongoose.connect('mongodb://' + db.host + ':' + db.port + '/' + db.dbName + '?authSource=' + db.authDb, {
  //   auth: {
  //     user: db.username,
  //     password: db.password
  //   }
  // })

  console.log("db connected...");
  

  mongoose.connect('mongodb://localhost:27017/illtip')
  // .then(() => console.log('connection successful'))
  // .catch((err) => console.error(err));
  // console.log(connectionString)

  // Connected handler
  mongoose.connection.on('connected', function (err) {
    console.log("Connected to DB using chain: " + db.host + ":" + db.port + "/" + db.dbName);
  });

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.log("MongoDB Error: ", err);
  });

  // Reconnect when closed
  mongoose.connection.on('disconnected', function () {
    self.connectToDatabase();
  });

  // return server.start();
} else {
  var db = config.database['local'];
  var connectionString = "mongodb://" + db.host + ":" + db.port + "/" + db.dbName
  mongoose.connect(connectionString, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to database ' + db.dbName);
    }
  });
}