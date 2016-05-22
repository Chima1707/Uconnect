#!/bin/env node
'use strict'

var Hapi = require('hapi')
var service = require('./lib/services/dbService')

// Create a server with a host and port
var server = new Hapi.Server()

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.connection({
  host: server_ip_address,
  port: server_port
})


var validate = function (decoded, request, callback) {

    service.getUser(decoded.id, function (err, data) {
      if(err) {
        return callback(null, false);
      }
      else {
        return callback(null, true);
      }
    })
    
}



server.register([require('vision'), require('inert'), 
{ register: require('lout') },require('hapi-auth-jwt2')], function (err) {
  
  if(err){
      console.log(err);
    }

    server.auth.strategy('jwt', 'jwt',
    { key: service.SECRET,          // Never Share your secret key
      validateFunc: validate,            // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    })
    
    server.route(require('./lib/routes.js'))
  
  server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server running at:', server.info.uri)
})

})


