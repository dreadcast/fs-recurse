var recurse = require('./../fs-recurse'),
	fs = require('fs'),
	Path = require('path');

recurse('test', function(path, file, type, cursor){
	fs.stat(path + '/' + file, function(err, stats){
		console.info(path + '/' + file, stats.size);
		
		cursor();
	});
}, function(){}, [/\.txt$/, 'index.html', /^\./]);