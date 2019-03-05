let isECS = true, hasInput = true;
try { new MouseEvent('click', {}); } catch (_) { isECS = false;}
try { InputEvent; } catch (_) { hasInput = false; };

const isIE8 = !document.createEvent && !isECS;

function buildInitEventArgs(type, opts, map) {
    const args = [type];
    opts = opts || {};
    
	for (let index = 0; index < map.length; index++) {
        const attribute = map[index];

        args.push(opts[attribute] || null);
    }
    
	return args;
}

function CreateEvent(typeArg, eventInit) {
    const event = document.createEventObject();

    for (let optKey in eventInit) {
		if (eventInit.hasOwnProperty(optKey)) {
            event[optKey] = eventInit[optKey]
		}
    }

    event.type = typeArg;

    return event;
}

const constructorRegistry = {
    Event: function (typeArg, eventInit) {
        const event = document.createEvent('Event');
        
        event.initEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
            'bubbles', 'cancelable'
        ]));
    
        return event;
    },
    MouseEvent: function (typeArg, eventInit) {
        const event = document.createEvent('MouseEvent');
    
        event.initMouseEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
            'bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX',
            'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget'
        ]));
    
        return event;
    },
    UIEvent: function (typeArg, eventInit) {
        const event = document.createEvent('UIEvent');
    
        event.initUIEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
            'bubbles', 'cancelable', 'view', 'detail'
        ]));
    
        return event;
    },
    KeyboardEvent: function (typeArg, eventInit) {
        const event = document.createEvent('KeyboardEvent');
            
        event.initKeyboardEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
            'bubbles', 'cancelable', 'view', 'char', 'key', 'location', 'modifiers', 'repeat'
        ]));
    
        return event;
    },
    FocusEvent: function (typeArg, eventInit) {
        const event = document.createEvent('FocusEvent');
    
        event.initFocusEvent.apply(event, buildInitEventArgs(typeArg, eventInit, [
            'bubbles', 'cancelable', 'view', 'detail', 'relatedTarget'
        ]));
    
        return event;
    }
};

const constructor = {
    Event: null,
    UIEvent: null,
    MouseEvent: null,
    KeyboardEvent: null,
    InputEvent: null, FocusEvent: null
};

function getEventConstructor() {
    if (isECS) {
        for (let key in constructor) {
            if (constructor.hasOwnProperty(key) && key !== 'InputEvent') {
                constructor[key] = window[key];
            }
        }

        constructor.InputEvent = hasInput ? InputEvent : constructorRegistry.UIEvent;

        return constructor;
    }

    if (isIE8) {
        for (let key in constructor) {
            if (constructor.hasOwnProperty(key) && key !== 'InputEvent') {
                constructor[key] = CreateEvent;
            }
        }

        return constructor;
    }

    for (let key in constructor) {
        if (constructor.hasOwnProperty(key) && key !== 'InputEvent') {
            constructor[key] = constructorRegistry[key];
        }
    }

    constructor.InputEvent = constructorRegistry.UIEvent;

    return constructor;
}

module.exports = getEventConstructor();

// touchEvent 判断环境，一个新的环境，区别于isECS和isIE8
// wheelEvent 设备兼容性（苹果）
// scrollEvent 同上