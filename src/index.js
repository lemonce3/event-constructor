const {EventFactory} = require('./util');

const eventMap = {
    MouseEvent: [
        'mousedown', 'mouseup', 'mouseover', 'mouseout',
        'mouseenter', 'mouseleave', 'click', 'dblclick', 'mousemove',
        'contextmenu'
    ],
    KeyboardEvent: [
        'keydown', 'keyup', 'keypress'
    ],
    FocuseEvent: [
        'blur', 'focus', 'focusin', 'focusout'
    ]
};

const noBubbleMouseEvent = ['mouseenter', 'mouseleave'];

function markEvent(event) {
	return Object.assign(event, {__LC__: true});
}

function isValidType(eventType, typeArg) {
    return eventMap[eventType].indexOf(typeArg) === -1;
}

const viewport = {
	top() {
		return window.screenTop + window.outerHeight - window.innerHeight;
	},
	left() {
		return window.screenLeft;
	}
};

function Event(typeArg, initEvent) {
    return markEvent(new EventFactory('Event', typeArg, Object.assign({}, {
        bubbles: true, cancelable: true
    }, initEvent)));
}

function UIEvent(typeArg, initEvent) {
    return markEvent(new EventFactory('UIEvent', typeArg, Object.assign({}, {
        bubbles: false, cancelable: true
    }, initEvent)));
}

function MouseEvent(typeArg, initEvent) {
    if (isValidType('MouseEvent', typeArg)) {
        throw new Error(`Invalid mouse event type: ${typeArg}`);
    }

    const defaultConfig = {
        bubbles: noBubbleMouseEvent.indexOf(typeArg) === -1, cancelable: true,
        clientX: 0, clientY: 0,
        button: 0, buttons: 0o000, ctrlKey: false, shiftKey: false, altKey: false, metaKey: false 
    }

    defaultConfig.screenX = defaultConfig['clientX'] + viewport.left;
    defaultConfig.screenY = defaultConfig['clientY'] + viewport.top;

    return markEvent(new EventFactory('MouseEvent', typeArg, Object.assign({}, defaultConfig, initEvent)));
}

function KeyboardEvent(typeArg, initEvent) {
    if (isValidType('KeyboardEvent', typeArg)) {
        throw new Error(`Invalid keyboard event type: ${typeArg}`);
    }

    return markEvent(new EventFactory('KeyboardEvent', typeArg, Object.assign({}, {
        bubbles: true, cancelable: true, ctrlKey: false,
        shiftKey: false, altKey: false, metaKey: false
    }, initEvent)));
}

function FocuseEvent(typeArg, initEvent) {
    if (isValidType('FocuseEvent', typeArg)) {
        throw new Error(`Invalid fouse event type: ${typeArg}`);
    }

    return markEvent(new EventFactory('UIEvent', typeArg, Object.assign({}, {
        bubbles: true, cancelable: true
    }, initEvent)));
}

function CustomEvent(typeArg, initEvent) {
    return markEvent(new EventFactory('CustomEvent', typeArg, Object.assign({}, {
        bubbles: false, cancelable: false, detail: null
    }, initEvent)));
}

module.exports =  {
    Event, MouseEvent, KeyboardEvent, FocuseEvent, UIEvent, CustomEvent
};