const IE8BaseInit = [
	'bubbles', 'cancelable', 'clientX', 'clientY', 'screenX', 'screenY',
	'offsetX', 'offsetY', 'altKey', 'ctrlKey', 'shiftKey', 'shiftLeft', 
	'ctrlLeft', 'altLeft', 'x', 'y'
];

exports.IE8InitMapping = {
	Event: [
	  'bubbles', 'cancelable'
	],
	UIEvent: IE8BaseInit,
	MouseEvent: IE8BaseInit.concat(['button', 'relatedTarget']),
	FocusEvent: IE8BaseInit.concat(['relatedTarget']),
	KeyboardEvent: IE8BaseInit.concat(['keyCode'])
};

const NotIE8BaseInit = ['bubbles', 'cancelable', 'view'];

exports.NotIe8InitMapping = {
	Event: [
	  'bubbles', 'cancelable'
	],
	UIEvent: NotIE8BaseInit.concat(['detail']),
	MouseEvent: NotIE8BaseInit.concat([
		'detail', 'screenX', 'screenY', 'clientX',
		'clientY', 'ctrlKey', 'altKey', 'shiftKey',
		'metaKey', 'button', 'relatedTarget'
	]),
	FocusEvent: NotIE8BaseInit.concat([
		'detail', 'relatedTarget'
	]),
	KeyboardEvent: NotIE8BaseInit.concat([
		'char', 'key', 'location', 'modifiers', 'repeat'
	])
};