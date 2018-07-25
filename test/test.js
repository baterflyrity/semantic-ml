const sml = require("../semantic-ml"),
	assert = require('assert'),
	fs = require("fs"),
	//Minify both HTML to obtain equal structure.
	minify = require('html-minifier').minify;

it("Example", function () {
	let origin = '' + fs.readFileSync('examples/login.html'),
		source = '' + fs.readFileSync('examples/login.sml');
	let options = {
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		quoteCharacter: '"',
		removeComments: true
	};
	assert.equal(minify(sml(source), options), minify(origin, options), 'Compiled HTML does not equal to the original one.');
});

it("Syntax", function () {
	let source = '! tag . class1 class2 class3 # identifier @ NoValueAttribute @ attributeName attribute/s long.value @ scriptData "data.value"\n' +
		'\t%sublevel plain text',
		origin = '<tag class="ui class1 class2 class3" id="identifier" NoValueAttribute attributeName="attribute/s long.value" scriptData="data for scripts">sublevel plain text</tag>';
	let options = {
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true,
		quoteCharacter: '"',
		removeComments: true
	};
	assert.equal(minify(sml(source, {value: 'data for scripts'}), options), minify(origin, options), 'Compiled HTML does not equal to the original one.');
});
