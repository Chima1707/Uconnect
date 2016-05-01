var Joi = require('joi')
var Boom = require("boom");
var services = require("./services/dbService")
module.exports = [
		{
		method: 'GET',
        path: '/api/users',
        handler: listUsers
		}, 
		
		{
		method: 'GET',
        path: '/api/users/{id}',
        handler: getUser
		}, 
		
		{
		method: 'GET',
        path: '/api/reports',
        handler: listReports
		}, 
		
		{
		method: 'PUT',
        path: '/api/users',
        handler: saveUser,
		config: {
        validate: {
            payload: {
                name: Joi.string().required().min(3).max(100)
             }
           }
       }	
		}
			
	]


function listUsers(request, reply){
	services.getUsers( function (err, data) {
		if(err){
			return reply(Boom.internal('Internal Errorr', err))
		}
		return reply(data);
	})
}


function listReports(request, reply){
	services.getReports( function (err, data) {
		if(err){
			return reply(Boom.internal('Internal Errorr', err))
		}
		return reply(data);
	})
}

function getUser (request, reply) {
var id = request.params.id 

}

function saveUser(request, reply){
	 return reply('success');
}

