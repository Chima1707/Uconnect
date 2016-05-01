'use strict';

var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.register([require('vision'), require('inert'),require('lout')], function (err) {
        
    if (err) {
        throw err;
    }

   server.route(require('./lib/routes.js'))

   server.start(function (err) {
       
    if (err) {
        throw err;
    }
    
    console.log('Server running at:', server.info.uri);
    
  });
 
});

