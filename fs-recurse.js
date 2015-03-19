(function(){	
	var Path = require('path'),
		anymatch = require('anymatch'),
		fs = require('fs'),
		_ = require('hidash');
	
	var defaultIgnore = [/^\./];
		
	function recurse(path, cb, done, ignore){
		if(!ignore)
			ignore = defaultIgnore;
		
		fs.readdir(path, function(error, dir){
			var matchers = anymatch(ignore);
			
			_.remove(dir, matchers);

			_.eachAsync(dir, function(file, index, cursor){				
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
	
	module.exports = recurse;
})();