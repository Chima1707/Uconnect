var path = require('path')
var fs = require('fs')
var uuid = require('node-uuid')
var JWT   = require('jsonwebtoken');

var secret = 'secret'
module.exports = {
  getTags: function (callback) {
    readJsonFile('tags', function (error, data) {
      if (error) {
        return callback(error)
      }
      return callback(null, data)
    })
  },

  getMinistries: function (callback) {
    readJsonFile('ministries', function (error, data) {
      if (error) {
        return callback(error)
      }
      return callback(null, data)
    })
  },

  getUsers: function (callback) {
    readJsonFile('userProfiles', function (error, data) {
      if (error) {
        return callback(error)
      }
      return callback(null, data)
    })
  },

  getUser: function (id, callback) {
    readJsonFile('userProfiles', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, 'id'))
      if (results && results.length) {
        return callback(null, results[0])
      } else {
        return callback(new Error('_id: ' + id + ' not found in users'))
      }
    })
  },

  removeUser: function (id, callback) {
    readJsonFile('userProfiles', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, 'id'))
      if (results && results.length) {
        var user = results[0]
        if (!removeItemFromItems(user, data)) {
          return callback(new Error('id: ' + id + ' removing from users'))
        } else {
          user.deleted = true
          writeJsonFile('userProfiles', data, function (error) {
            if (error) {
              return callback(error)
            }
            return callback(null, user)
          })
        }
      } else {
        return callback(new Error('_id: ' + id + ' not found in users'))
      }
    })
  },

  createUser: function (user, callback) {
    readJsonFile('userProfiles', function (error, data) {
      if (error) {
        return callback(error)
      }
      
      // check if user already exists
      
       var results = data.filter(filterByProperty.bind(null, user.email, 'email'))
      if (results && results.length) {
        return callback(new Error('user with email: ' + user.email + ' already exists'))
      }
      
      results = data.filter(filterByProperty.bind(null, user.username, 'username'))
      if (results && results.length) {
        return callback(new Error('user with username: ' + user.username + ' already exists'))
      }
      
       results = data.filter(filterByProperty.bind(null, user.phone, 'phone'))
      if (results && results.length) {
        return callback(new Error('user with Phone number: ' + user.phone + ' already exists'))
      }
      
      // generate _id
      var id = uuid.v4()
      user.id = id
      user.active = true
      user.status = 'Activated'
      user.createdAt = new Date().toISOString()
      data.push(user)
      writeJsonFile('userProfiles', data, function (error) {
        if (error) {
          return callback(error)
        }
        return callback(null, user)
      })
    })
  },
  
  login: function (login, callback) {
    readJsonFile('userProfiles', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, login.email, 'email'))
      if(!results || !results.length) {
        return callback(new Error('user not found'))
      } 
      
      var user = results[0]
      
      if (user.password !== login.password) {
         return callback(new Error('wrong password'))
      }
      
      delete user.password 
      
      var token = JWT.sign({email: user.email, id: user.id}, secret, {expiresIn : '7 days'});
      
     return callback(null, {user:user, token:token}) 
      
    })
  },
  
  SECRET: secret,

  editUser: function (id, user1, callback) {
    readJsonFile('userProfiles', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, 'id'))
      if (results && results.length) {
        var user = results[0]
        if (!replaceItemInItems(user1, user, data)) {
          return callback(new Error('id: ' + id + ' updating from users'))
        } else {
          writeJsonFile('userProfiles', data, function (error) {
            if (error) {
              return callback(error)
            }
            return callback(null, user1)
          })
        }
      } else {
        return callback(new Error('id: ' + id + ' not found in users'))
      }
    })
  },

  getReports: function (callback) {
    readJsonFile('reports', function (error, data) {
      if (error) {
        return callback(error)
      }
      return callback(null, data)
    })
  },

  getReport: function (id, callback) {
    readJsonFile('reports', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, '_id'))
      if (results && results.length) {
        return callback(null, results[0])
      } else {
        return callback(new Error('_id: ' + id + ' not found in reports'))
      }
    })
  },

  createReport: function (report, callback) {
    readJsonFile('reports', function (error, data) {
      if (error) {
        return callback(error)
      }
      var id = uuid.v4()
      report._id = id
      report.createdAt = new Date().toISOString()
      data.push(report)
      writeJsonFile('reports', data, function (error) {
        if (error) {
          return callback(error)
        }
        return callback(null, report)
      })
    })
  },

  removeReport: function (id, callback) {
    readJsonFile('reports', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, '_id'))
      if (results && results.length) {
        var report = results[0]
        if (!removeItemFromItems(report, data)) {
          return callback(new Error('_id: ' + id + ' removing from reports'))
        } else {
          report.deleted = true
          writeJsonFile('reports', data, function (error) {
            if (error) {
              return callback(error)
            }
            return callback(null, report)
          })
        }
      } else {
        return callback(new Error('_id: ' + id + ' not found in Reports'))
      }
    })
  },

  editReport: function (id, report1, callback) {
    readJsonFile('reports', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, '_id'))
      if (results && results.length) {
        var report = results[0]
        if (!replaceItemInItems(report1, report, data)) {
          return callback(new Error('_id: ' + id + ' updating from reports'))
        } else {
          writeJsonFile('reports', data, function (error) {
            if (error) {
              return callback(error)
            }
            return callback(null, report1)
          })
        }
      } else {
        return callback(new Error('_id: ' + id + ' not found in reportss'))
      }
    })
  },
  
  // start news
  
  getNewss: function (callback) {
    readJsonFile('news', function (error, data) {
      if (error) {
        return callback(error)
      }
      return callback(null, data)
    })
  },

  getNews: function (id, callback) {
    readJsonFile('news', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, '_id'))
      if (results && results.length) {
        return callback(null, results[0])
      } else {
        return callback(new Error('_id: ' + id + ' not found in news'))
      }
    })
  },

  createNews: function (news, callback) {
    readJsonFile('news', function (error, data) {
      if (error) {
        return callback(error)
      }
      var id = uuid.v4()
      news._id = id
      news.createdAt = new Date().toISOString()
      data.push(news)
      writeJsonFile('news', data, function (error) {
        if (error) {
          return callback(error)
        }
        return callback(null, news)
      })
    })
  },

  removeNews: function (id, callback) {
    readJsonFile('news', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, '_id'))
      if (results && results.length) {
        var news = results[0]
        if (!removeItemFromItems(news, data)) {
          return callback(new Error('_id: ' + id + ' removing from news'))
        } else {
          news.deleted = true
          writeJsonFile('news', data, function (error) {
            if (error) {
              return callback(error)
            }
            return callback(null, news)
          })
        }
      } else {
        return callback(new Error('_id: ' + id + ' not found in news'))
      }
    })
  },

  editNews: function (id, news1, callback) {
    readJsonFile('news', function (error, data) {
      if (error) {
        return callback(error)
      }
      var results = data.filter(filterByProperty.bind(null, id, '_id'))
      if (results && results.length) {
        var news = results[0]
        if (!replaceItemInItems(news1, news, data)) {
          return callback(new Error('_id: ' + id + ' updating from news'))
        } else {
          writeJsonFile('news', data, function (error) {
            if (error) {
              return callback(error)
            }
            return callback(null, news1)
          })
        }
      } else {
        return callback(new Error('_id: ' + id + ' not found in news'))
      }
    })
  }
  
  //end news

}

function filterByProperty (id, property, item) {
  return item[property] == id
}

function removeItemFromItems (item, items) {
  var index = items.indexOf(item)
  if (index >= 0) {
    items.splice(index, 1)
    return true
  }
  return false
}

function replaceItemInItems (item1, item, items) {
  var index = items.indexOf(item)
  if (index >= 0) {
    items[index] = item1
    return true
  }
  return false
}

function readJsonFile (fileName, callback) {
  fileName += '.json'
  var filePath = path.resolve(__dirname, '../db/' + fileName)
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    try {
      var json = JSON.parse(data)
      return callback(null, json)
    } catch(err) {
      return callback(err)
    }
  })
}

function writeJsonFile (fileName, data, callback) {
  try {
    data = JSON.stringify(data, null, 4)
    fileName += '.json'
    var filePath = path.resolve(__dirname, '../db/' + fileName)
    fs.writeFile(filePath, data, {encoding: 'utf8'}, function (err, data) {
      if (err) {
        return callback(err)
      }
      try {
        return callback(null)
      } catch(err) {
        return callback(err)
      }
    })
  } catch(err) {
    return callback(err)
  }
}
