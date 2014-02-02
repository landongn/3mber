/*jshint node:true*/
'use strict';

var CONFIG = {
	pages: 'pages/',
	source: 'static/',
	static: 'deploy/static/',
	deploy: 'deploy/',
	livereloadPort: 34567
};

module.exports = function (grunt) {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.loadTasks('grunt/tasks');

	[
		'clean',
		'compass',
		'concurrent',
		'connect',
		'copy',
		'emberTemplates',
		'haychtml',
		'jshint',
		'neuter',
		'notify',
		'open',
		'uglify',
		'watch',
		'webfont'
	].forEach(function (key) {
		grunt.config(key, require('./grunt/config/' + key)(CONFIG));
	});

	grunt.registerTask('server', function (target) {
		if (target) {
			CONFIG.livereloadPort = +target + 30000;
			grunt.config('watch.livereload.options.livereload', CONFIG.livereloadPort);
			grunt.config('connect.options.port', target);
		}

		grunt.task.run([
			'clean:build',
			'concurrent:develop',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('build', [
		'clean:build',
		'concurrent:build',
		'uglify',
		'copy:build',
		'notify:build'
	]);

	grunt.registerTask('default', [
		'jshint',
		'build'
	]);
};
