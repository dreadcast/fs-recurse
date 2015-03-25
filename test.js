var assert = require('assert'),
	_ = require('./node_modules/lowerdash/src/lowerdash.js'),
	recurse = require('./fs-recurse'),
	fs = require('fs'),
	Path = require('path');

describe('fs-recurse', function(){
	describe('Without [/\.txt$/, "index.html", /^\./]', function(){
		var collector = [];

		before(function(done){
			recurse('./playground', function(path, file, type, cursor){
				collector.push(path + '/' + file);
				cursor();
			}, done, [/\.txt$/, 'index.html', /^\./]);
		});
			
		it('collector should not contain 1.txt', function(){
			assert.equal(false, _.contains(collector, 'playground/test/1.txt'));
		});
		it('collector should not contain index.html', function(){
			assert.equal(false, _.contains(collector, 'playground/test/index.html'));
		});
		it('collector should contain a folder named "sub-folder"', function(done){
			assert.equal(true, _.contains(collector, 'playground/test/sub-folder'));
			
			fs.stat(__dirname + '/playground/test/sub-folder', function(err, stat){
				if(err)
					throw new Error(err);
					
				assert.equal(true, stat.isDirectory());
				done();
			});
		});
	});
});