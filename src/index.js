const {IE8InitMapping, NotIe8InitMapping} = require('./mapping');

const isIE8 = !document.createEvent;

function forEach(arr, callback) {
  if (arr.forEach) {
    return arr.forEach(callback);
  }

	for (let index = 0; index < arr.length; index++) {
	  callback(arr[index], index);
	}
}

function buildInitEventArgs(type, opts = {}, map) {
  const args = [type];
  
  forEach(map, function (item) {
    args.push(opts[item] || null);
  });
    
  return args;
}

const IE8 = {};
const NonIE8 = {};

for (let key in IE8InitMapping) {
  IE8[key] = function (typeArg, eventInit) {
    const event = document.createEventObject();
    const isTargetFrom = typeArg === 'mouseover' || typeArg === 'focusin';

    for (let optKey in eventInit) {
      let isExist = false;

      forEach(IE8InitMapping[key], function (item) {
        if (item === optKey) { isExist = true; }
      });

      if (isExist) {
        if (optKey === 'bubbles') { event.cancelBubble = !eventInit.bubbles; }
        else if (optKey === 'cancelable') { event.returnValue = !eventInit.cancelable; }
        else if (optKey === 'relatedTarget' &&  isTargetFrom) {
          event.fromElement = eventInit.relatedTarget;
        }
        else if (optKey === 'relatedTarget' &&  !isTargetFrom) {
          event.toElement = eventInit.relatedTarget;
        }
        else if (optKey === 'target') { event.srcElement = eventInit.target }
        else {
          event[optKey] = eventInit[optKey];
        }
      }
    }

    event.type = typeArg;

    return event;
  }
}

const keyEventInit = [
  'bubbles', 'cancelable', 'view', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'char', 'key'
];

for (let key in NotIe8InitMapping) {

  NonIE8[key] = function (typeArg, eventInit) {
    const event = document.createEvent(key);

    if (key === 'KeyboardEvent' && !event.initKeyboardEvent) {
      event.initKeyEvent.apply(event, buildInitEventArgs(typeArg, eventInit, keyEventInit));
    } else {
      event[`init${key}`].apply(event, buildInitEventArgs(typeArg, eventInit, NotIe8InitMapping[key]));
    }

    return event;
  }
}

NonIE8.InputEvent = NonIE8.UIEvent

let isECS = true, canUseKeyboardEvent = true, canUseInputEvent = true;

try { new MouseEvent('click', {}); } catch (_) { isECS = false; };
try { new KeyboardEvent('keypress', {}); } catch (_) { canUseKeyboardEvent = false; };
try { new InputEvent('input', {}); } catch (_) { canUseInputEvent = false; };

const constructor = {
  MouseEvent: null,
	UIEvent: null,
	KeyboardEvent: null,
	FocusEvent: null,
  Event: null,
  InputEvent: null
};

for (let key in constructor) {
  if (isIE8) {
    constructor[key] = IE8[key] ? IE8[key] : null;
  } else if (!isECS || (key === 'KeyboardEvent' && !canUseInputEvent) || (key === 'InputEvent' && !canUseKeyboardEvent)) {
    constructor[key] = NonIE8[key];
  } else {
    constructor[key] = window[key];
  }
}

module.exports = constructor;
