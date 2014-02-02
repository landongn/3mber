/*jshint node:true*/
'use strict';

// https://github.com/gruntjs/grunt-contrib-watch

// Run tasks whenever files are changed, added, or deleted.

module.exports = function (config) {
	return {
		compass: {
			files: [config.source + 'scss/{,**/}{,*.scss,*.sass}'],
			tasks: ['compass:develop']
		},
		emberTemplates: {
			files: config.source + 'templates/{,**/}{,*.hbs}',
			tasks: ['emberTemplates']
		},
		haychtml: {
			files: [config.pages + '{,**/}*.html'],
			tasks: ['haychtml']
		},
		neuter: {
			files: [config.source + 'js/{,**/}{,*.js}'],
			tasks: ['neuter:app']
		},
		livereload: {
			options: {
				livereload: config.livereloadPort
			},
			files: [
				config.deploy + '{,**/}*.html',
				config.static + '{,**/}*.{css,js,png,jpg,jpeg,gif,webp,svg}',
				config.source + '{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
			]
		}
	};
};
