const gulp = require('gulp'),
	transform = require('gulp-transform'),
	ext_replace = require('gulp-ext-replace'),
	sml = require('../semantic-ml');

//Building example
gulp.task('default', () => {
	//Get all files with .sml extension (considered as Semantic Markup Language files).
	return gulp.src('*.sml')
		//Use gulp-transform plugin to compile each file content. Pass sml as a transformation function AFTER encoding!
		.pipe(transform('utf8', sml))
		//Change extensions to .html.
		.pipe(ext_replace('.build.html'))
		//Save compiled files.
		.pipe(gulp.dest(''));
});