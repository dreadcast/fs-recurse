var gulp = require('gulp');

require('dreadcast-operative/release')(gulp);

gulp.task('default', ['version:full']);