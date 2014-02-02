/*jshint node:true*/
'use strict';

// https://github.com/timrwood/haychtml

// Compiles html templates.

module.exports = function (config) {
	return {
		build : {
			engine: 'swig',
			src: config.pages,
			dest: config.deploy,
			data : {
				STATIC_URL : '/static/'
			}
		}
	};
};
