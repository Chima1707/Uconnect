var path = require('path')
var fs = require('fs')
module.exports = {
	getUsers : function (callback) {
		readJsonFile ('userProfiles', function (error,data) {
			if (error) {
				return callback(error)
			}
			return callback(null, data)		
		})
	},
	getReports : function (callback) {
			readJsonFile ('reports', function (error,data) {
			if (error) {
				return callback(error)
			}
			return callback(null, data)		
		})
	},
	
	getUser : function (id, callback) {
		readJsonFile()
	}
	
}

function readJsonFile(fileName, callback) {
	fileName += '.json'
	var filePath  = path.resolve(__dirname, '../db/'+fileName)
	fs.readFile(filePath, 'utf8', function (err, data) {
		if(err) {
			return callback(err)
		}
		try{
			var json = JSON.parse(data)
			return callback(null, json)
		}
		catch(err){
			return callback(err)
		}
	})
}