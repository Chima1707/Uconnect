var Joi = require('joi')
var Boom = require('boom')
var services = require('./services/dbService')
var entities = require('./entities')
module.exports = [
  {
    method: 'GET',
    path: '/api/tags',
    handler: listTags
  },
  {
    method: 'GET',
    path: '/api/ministries',
    handler: listMinistries
  },
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
    method: 'PUT',
    path: '/api/users',
    handler: createUser,
    config: {
      validate: {
      payload: entities.schema.user
     }
    
    }
  },
  
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: login,
    config: {
      validate: {
      payload: entities.schema.login
     }
    
    }
  },

  {
    method: 'DELETE',
    path: '/api/users/{id}',
    handler: removeUser
  },

  {
    method: 'POST',
    path: '/api/users/{id}',
    handler: editUser
  },

  {
    method: 'GET',
    path: '/api/reports',
    handler: listReports
  },

  {
    method: 'GET',
    path: '/api/reports/{id}',
    handler: getReport
  },

  {
    method: 'PUT',
    path: '/api/reports',
    handler: createReport
  },
  {
    method: 'DELETE',
    path: '/api/reports/{id}',
    handler: removeReport
  },
  {
    method: 'POST',
    path: '/api/reports/{id}',
    handler: editReport
  },
  
  //start news
  
  {
    method: 'GET',
    path: '/api/news',
    handler: listNews
  },

  {
    method: 'GET',
    path: '/api/news/{id}',
    handler: getNews
  },

  {
    method: 'PUT',
    path: '/api/news',
    handler: createNews,
     config: {
      validate: {
      payload: entities.schema.news
     }
    
    }
  },
  {
    method: 'DELETE',
    path: '/api/news/{id}',
    handler: removeNews
  },
  {
    method: 'POST',
    path: '/api/news/{id}',
    handler: editNews
  },
  
  // end news

]

function listUsers (request, reply) {
  services.getUsers(function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function listTags (request, reply) {
  services.getTags(function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function listMinistries (request, reply) {
  services.getMinistries(function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function createUser (request, reply) {
  var user = request.payload
  services.createUser(user, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function editUser (request, reply) {
  var user = request.payload
  var id = request.params.id
  services.editUser(id, user, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function getUser (request, reply) {
  var id = request.params.id
  services.getUser(id, function (err, data) {
    handleResult(err, data, request, reply)
  })
}


function login (request, reply) {
  var payload = request.payload
  services.login(payload, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function removeUser (request, reply) {
  var id = request.params.id
  services.removeUser(id, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

// start report

function getReport (request, reply) {
  var id = request.params.id
  services.getReport(id, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function createReport (request, reply) {
  var report = request.payload
  services.createReport(report, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function listReports (request, reply) {
  services.getReports(function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function removeReport (request, reply) {
  var id = request.params.id
  services.removeReport(id, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function editReport (request, reply) {
  var report = request.payload
  var id = request.params.id
  services.editReport(id, report, function (err, data) {
    handleResult(err, data, request, reply)
  })
}
// start news
function getNews (request, reply) {
  var id = request.params.id
  services.getNews(id, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function createNews (request, reply) {
  var news = request.payload
  services.createNews(news, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function listNews (request, reply) {
  services.getNewss(function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function removeNews (request, reply) {
  var id = request.params.id
  services.removeNews(id, function (err, data) {
    handleResult(err, data, request, reply)
  })
}

function editNews (request, reply) {
  var news = request.payload
  var id = request.params.id
  services.editNews(id, news, function (err, data) {
    handleResult(err, data, request, reply)
  })
}


function handleResult (err, data, request, reply) {
  if (err) {
    return reply(err)
  }
  return reply(data)
}


