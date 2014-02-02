/*jshint node:true*/
'use strict';

// Get your ip address
function ip() {
	var interfaces = require('os').networkInterfaces();
	return Object.keys(interfaces).map(function (key) {
		return interfaces[key];
	}).reduce(function (last, item) {
		return item.reduce(function (last, item) {
			if (item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal) {
				return item.address;
			}
			return last;
		}) || last;
	}) || '0.0.0.0';
}

module.exports = function () {
	return {
		server: {
			path: 'http://' + ip() + ':<%= connect.options.port %>'
		}
	};
};
