(function(){	
	var Path = require('path'),
		fs = require('fs'),
		_ = require('hidash');
	
	var defaultIgnore = [/^\./],
		
		recurse = function recurse(path, cb, done, ignore){
			if(!ignore)
				ignore = defaultIgnore;
			
			fs.readdir(path, function(error, dir){
				var dirContent = _.filter(dir, function(file){
					var fileExcluded = false;
					
					_.each(ignore, function(filter){
						fileExcluded = file.match(filter);
						
						fileExcluded && console.info('EXCLUDE', file, filter);
					});
					
					return !fileExcluded;
				});
				
				_.eachAsync(dirContent, function(file, index, cursor){				
					fs.stat(Path.join(path, file), function(err, stats){
						var type = 'folder';

						if(stats.isDirectory())
							recurse(Path.join(path, file), cb, cursor, ignore);
						
						else if(stats.isFile())
							type = Path.extname(file).replace(/^\./, '');
						
						cb(path, file, type, cursor);
					});
				}, done);
			});
		};
	
	recurse.extend = function(){
		fs.recurse = recurse;
		
		return fs;
	};
	
	module.exports = recurse;
})();