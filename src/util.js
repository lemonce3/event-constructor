let isECS = true;

try { new Event('click', {}); } catch (_) { isECS = false; }

if (typeof Object.assign != 'function') {
    Object['assign'] = function (target) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        let to = Object(target);

        [...arguments].forEach(nextSource => {
            if (nextSource != null) {
                for (let nextKey in nextSource) {
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
            }
        });

        return to;
      }
  }

const map = {
    Event: ['bubbles', 'cancelable'],
    MouseEvent: ['bubbles', 'cancelable', 'view', 'detail', 'screenX',
        'screenY','clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey',
        'metaKey', 'button', 'relatedTarget'],
    UIEvent: ['bubbles', 'cancelable', 'view', 'detail'],
    KeyboardEvent: ['bubbles', 'cancelable', 'view', 'ctrlKey', 'altKey',
        'shiftKey', 'metaKey', 'keyCode', 'charCode'],
    CustomEvent: ['bubbles', 'cancelable', 'detail']
}

const createEvent = document.createEvent || document.createEventObject;

const initEvent = function (type, event, eventName, initConfig) {
    const initFunction = event[`init${type}`];

    if (initFunction) {
        const config = map[type].map(item => initConfig[item] ? initConfig[item] : null);

        initFunction.apply(event, [eventName, ...config]);

        return event;
    }

    Object.defineProperty(event, 'type', {value: eventName});

    map[type].forEach(item => {
        Object.defineProperty(event, item, {value: initConfig[item] !== undefined ? initConfig[item] : null});
    });

    return event;
};

exports.dispatchEvent = function (target, event) {
    typeof target.dispatchEvent === 'function' ? target.dispatchEvent(event) : target.fireEvent(`on${event.type}`, event)
};

exports.EventFactory = function (eventType, typeArg, eventInit) {
    return isECS ? new window[eventType](typeArg, eventInit) : (function (eventType, typeArg, eventInit) {
        const event = createEvent.apply(document, [eventType]);

        return initEvent(eventType, event, typeArg, eventInit);
    })(eventType, typeArg, eventInit);
}