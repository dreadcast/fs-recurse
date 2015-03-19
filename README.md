# fs-recurse
Walk through directories asynchronously, with callback on each file/folder and ignore option

## Usage
```
npm install fs-recurse
```
### Signature
```
recurse(String path, Function callback, Function done, Array ignore);
```
#### Arguments

1.	`path String`
	
	Path in which you want to recurse

2.	`callback Function` 

	Receives four arguments : 

	* `path String` current path
	* `filename String` current file name
	* `type String` file extension or 'folder'
	* `cursor Function` call this function after executing any async operation on current file

3.	`done Function` 

	Invoked when recursion is done
	
4.	`ignore Array`

	[Anymatch](https://github.com/es128/anymatch) compatible filters...
	

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
