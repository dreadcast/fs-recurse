# fs-recurse
Walk through directories asynchronously, with callback on each file/folder and ignore option

## Usage
```
npm install fs-recurse
```
### Signature
```
recurse(String path, Function cursor, Function callback, Array ignore);
```
cursor passes four arguments : 
* path (current path)
* filename (current file name)
* type (file extension or 'folder')
* cursor (call this after executing any async operation on current file)

```javascript
var recurse = require('./fs-recurse');

recurse('test', function(path, filename, type, cursor){
	fs.stat(path + '/' + file, function(err, stats){
		cursor();
		// Do async operation on files ...
	});
}, function(){
	console.log('Done!');
}, [/\.txt$/, 'index.html']);
// *.txt and index.html will be ignored
```

## Extend FS

Alternatively, you can extend Node's fs module : 

```javascript
var fs = require('./fs-recurse').extend();

fs.recurse('test', function(path, file, type, cursor){
	//...
});
```
