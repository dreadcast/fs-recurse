(function(){	
	var Path = require('path'),
		anymatch = require('anymatch'),
		fs = require('fs'),
		_ = require('lowerdash');
	
	var defaultIgnore = [/^\./];
		
	function recurse(path, cb, done, ignore){
		if(!ignore)
			ignore = defaultIgnore;
		
		var matchers = anymatch(ignore);
		
		fs.readdir(path, function(error, dir){
			dir = dir.filter(function(file){
				return !matchers(file);
			})

			_.eachAsync(dir, function(file, index, cursor){				
				fs.stat(Path.join(path, file), function(err, stats){
					if(stats.isDirectory())
						cb(path, file, 'folder', function(){
							recurse(Path.join(path, file), cb, cursor, ignore);
						});
					
					else if(stats.isFile())
						cb(path, file, Path.extname(file).replace(/^\./, ''), cursor);
				});
			}, done);
		});
	};
	
	module.exports = recurse;
})();