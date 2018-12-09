const fs = require('fs');
const async = require('async');

module.exports = {
	fileWrite: function(data) {
		fs.exists("log.json", function(exists) {
			if (exists) {
				fs.readFile('log.json', function(err, content) {
					obj = JSON.parse(content); //now it an object
					obj.push(data); //add some data
					fs.writeFile('log.json', JSON.stringify(obj), function(err) {});
				});
			} else {
				let tmpArr = []
				tmpArr.push(data);
				fs.writeFile('log.json', JSON.stringify(tmpArr), function(err) {});
			}
		});
		return data;
	},
	fileRead: function(cb) {
		fs.exists("log.json", function(exists) {
			if (exists) {
				fs.readFile('log.json', function(err, data) {
					let tmpArr = {};
					tmpArr['allowed-ip'] = [];
					tmpArr['denied-ip'] = [];
					data = JSON.parse(data);
					async.mapSeries(data, (row, asyncCb) => {
						if (row.allowed == 'true') {
							tmpArr['allowed-ip'].push(row)
						} else {
							tmpArr['denied-ip'].push(row)
						}
						asyncCb(null, row)
					}, function(err, resp) {
						cb(null, tmpArr);
					});
				});
			} else {
				cb(null, "Log.json file missing!");
			}
		});
	}
}