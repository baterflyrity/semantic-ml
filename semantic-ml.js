/*Semantic ML (Markup Language)
Syntax example:
!tag.class class class #identifier @NoValueAttribute @attributeName attribute long.value
	%sublevel plain text
*/
let sml = function (text, scriptsData) {
	data = scriptsData ? scriptsData : {};
	return sml.Build(sml.Parse(text));
};
sml.classTags = {
	image: 'img',
	icon: 'i',
	button: 'div',
	buttons: 'div',
	or: 'div',
	container: 'div',
	divider: 'div',
	column: 'div',
	grid: 'div',
	flag: 'i',
	content: 'div',
	images: 'div',
	input: 'div',
	label: 'div',
	list: 'div',
	segment: 'div',
	dimmer: 'div',
	loader: 'div'
};
sml.Parse = function (text) {
	let oldText;
	while (oldText != text) {
		oldText = text;
		text = sml.Script(text);
	}
	let lines = text.split('\n');
	let expressions = Array();
	lines.map(function (l) {
		let value = l.replace(/[\t\s]*(.*)/, '$1').replace(/[\t\s]*$/, '');
		if (value.length === 0)
			return;
		let exp = {level: l.replace(/(\t*)[^\t]*.*/, '$1').length};
		if (value[0] === '%')
			exp.text = value.substr(1);
		else {
			let result = sml.ParseExpression(value);
			result.level = exp.level;
			exp = result;
		}
		expressions.push(exp);
	});
	return expressions;
};
sml.ParseExpression = function (expressionString) {
	let resultObject = {};
	let matches = expressionString.match(/(?:!\s*(\w+))?(?:\s*(\.))?(?:\s*([^#@]*))?(?:\s*#\s*(\w+))?(?:\s*(.*))?/i);
	if (matches[1] != undefined)
		resultObject.tag = matches[1];
	resultObject.ui = matches[2] != undefined ? 'ui ' : '';
	if (matches[3] != undefined) {
		resultObject.classes = matches[3].split(/\s+/).filter(function (_classItem) {
			return _classItem.length !== 0;
		});
		if (!resultObject.hasOwnProperty('tag'))
			resultObject.classes.map(function (cl) {
				if (sml.classTags.hasOwnProperty(cl))
					resultObject.tag = sml.classTags[cl];
			});
	}
	else
		resultObject.classes = Array();
	if (!resultObject.hasOwnProperty('tag'))
		resultObject.tag = 'div';
	if (matches[4] != undefined)
		resultObject.id = matches[4];
	resultObject.attributes = Array();
	if (matches[5] != undefined) {
		matches[5].split(/\s*@\s*/)
			.filter(function (_classItem) {
				return _classItem.length !== 0;
			})
			.map(function (_attributeString) {
				let temp = _attributeString.match(/([\w-]+)(?:\s+(.*))?/);
				resultObject.attributes.push({
					name: temp[1],
					value: temp[2] == undefined ? '' : temp[2]
				});
			});
	}
	return resultObject;
};
sml.Build = function (expressions) {
	if (expressions.length === 0)
		return;
	let closeTags = Array();
	let code = '';
	expressions.map(function (exp) {
		while (closeTags.length != 0 && exp.level <= closeTags[closeTags.length - 1].level)
			code += closeTags.pop().code;
		if (exp.hasOwnProperty('text')) {
			code += exp.text;
			closeTags.push({
				code: '\n',
				level: exp.level
			});
		}
		else {
			code += '<' + exp.tag;
			if (exp.ui || exp.classes.length != 0)
				code += (' class="'
					+ exp.ui
					+ (exp.classes.length != 0 ? exp.classes.join(' ') : '')
					+ '"').replace(' "', '"');
			if (exp.hasOwnProperty('id'))
				code += ' id="' + exp.id + '"';
			if (exp.attributes.length != 0)
				exp.attributes.map(function (attr) {
					code += (' ' + attr.name + '="' + attr.value + '"').replace('=""', '');
				});
			code += '>';
			closeTags.push({
				code: '</' + exp.tag + '>',
				level: exp.level
			});
		}
	});
	closeTags.reverse().map(function (tag) {
		code += tag.code;
	});
	return code;
};
sml.Repeat = function (str, count) {
	let out = '';
	for (let i = 0; i < count; i++)
		out += str;
	return out;
};
sml.Script = function (text) {
	let match = text.match(/"([^"]*)"/);
	if (!match)
		return text;
	let code = match[0].substr(1, match[0].length - 2);

	let output = Array();
	let qt = '"';
	let amp = "'";
	let write = function (level, code) {
		output.push('\n' + sml.Repeat('\t', level) + code);
	};
	let script = function (code) {
		return '"' + code + '"';
	};
	let result = eval(code);
	if (result == undefined)
		result = '';
	return text.replace(match[0], result + output.join(''));
};
let data;
module.exports = sml;