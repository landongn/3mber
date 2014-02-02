/*jshint node:true*/
'use strict';

// https://github.com/gruntjs/grunt-contrib-connect

// Start a connect web server.

var path = require('path');

module.exports = function (config) {
	return {
		options: {
			port: 8000,
			hostname: '0.0.0.0'
		},
		livereload: {
			options: {
				middleware: function (connect) {
					return [
						require('connect-livereload')({
							port: config.livereloadPort
						}),
						connect.static(path.resolve('.', config.deploy)),
						connect.static(path.resolve('.'))
					];
				}
			}
		}
	};
};
