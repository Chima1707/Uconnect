#!/bin/env node
'use strict';

var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.connection({ 
    host: server_ip_address, 
    port: server_port 
});


   server.route(require('./lib/routes.js'))

   server.start(function (err) {
       
    if (err) {
        throw err;
    }
    
    console.log('Server running at:', server.info.uri);
    
  });
 