const {isECS, isIE8} = require('./enviroment');
const defaultBehavior = require('./default-behavior');

function buildInitEventArgs(type, opts, map) {
    const args = [type];
    opts = opts || {};
    
	for (let index = 0; index < map.length; index++) {
        const attribute = map[index];

        args.push(opts[attribute] || null);
    }
    
	return args;
}

function createEvent(typeArg, eventInit) {
    const event = document.createEventObject(window.event);

    for (let optKey in eventInit) {
		if (eventInit.hasOwnProperty(optKey)) {
            Object.defineProperty(event, optKey, {value: eventInit[optKey]});
		}
    }

    Object.defineProperty(event, 'type', {value: typeArg});

    // 触发事件元素的默认行为

    return event;
}

const $Event = function (typeArg, eventInit) {
    const event = document.createEvent('Event');
    
    event.initEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
        'bubbles', 'cancelable'
    ]));

    return event;
};

const $MouseEvent = function (typeArg, eventInit) {
    const event = document.createEvent('MouseEvent');

    event.initEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
        'bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX',
        'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget'
    ]));

    return event;
};

const $UIEvent = function (typeArg, eventInit) {
    const event = document.createEvent('UIEvent');

    event.initUIEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
        'bubbles', 'cancelable', 'view', 'detail'
    ]));

    return event;
};

const $KeyboardEvent = function (typeArg, eventInit) {
    const event = document.createEvent('KeyboardEvent');
        
    event.initKeyboardEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
        'bubbles', 'cancelable', 'view', 'char', 'key', 'location', 'modifiers', 'repeat'
    ]));

    return event;
};

const $InputEvent = $UIEvent;

const $FocusEvent = function (typeArg, eventInit) {
    const event = document.createEvent('FocusEvent');

    event.initFocusEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
        'bubbles', 'cancelable', 'view', 'detail', 'relatedTarget'
    ]));

    return event;
};

const $CustomEvent = function (typeArg, eventInit) {
    const event = document.createEvent('CustomEvent');

    event.initCustomEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
        'bubbles', 'cancelable', 'detail'
    ]));

    return event;
};

let constructor = isECS ? {
    Event, MouseEvent, UIEvent, KeyboardEvent, InputEvent, FocusEvent,
    CustomEvent
} : (
    isIE8 ? {
        Event: createEvent,
        UIEvent: createEvent,
        MouseEvent: createEvent,
        KeyboardEvent: createEvent,
        InputEvent: null, FocusEvent: null,
        CustomEvent: null
    } : {
        Event: $Event,
        UIEvent: $UIEvent,
        MouseEvent: $MouseEvent,
        KeyboardEvent: $KeyboardEvent,
        InputEvent: $InputEvent,
        FocusEvent: $FocusEvent,
        CustomEvent: $CustomEvent
    }
);

module.exports = constructor;