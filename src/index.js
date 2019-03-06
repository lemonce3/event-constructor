const isIE8 = !document.createEvent;

function forEach(arr, callback) {
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

const UIInit = [
  'cancelBubble', 'returnValue', 'clientX', 'clientY', 'screenX', 'screenY', 'offsetX', 'offsetY',
  'x', 'y', 'altKey', 'altleft', 'ctrlKey', 'ctrlLeft', 'shiftKey', 'shiftLeft'
];

const ie8InitMapping = {
  Event: [
    'cancelBubble', 'returnValue'
  ],
  UIEvent: UIInit,
  MouseEvent: UIInit.concat(['button', 'buttonID', 'toElement', 'fromElement']),
  KeyboardEvent: UIInit.concat(['keyCode']),
  FocusEvent: UIInit.concat(['toElement', 'fromElement'])
};

ie8InitMapping.UIEvent.push('dataTransfer', 'contentOverflow');

const ie8 = {};
ie8.InputEvent = null;

for (let key in ie8InitMapping) {
  ie8[key] = function (typeArg, eventInit) {
    const event = document.createEventObject();

    for (let optKey in eventInit) {
      let isExist = false;

      forEach(ie8InitMapping[key], function (item) {
        if (isExist) {
          return;
        }

        isExist = item === optKey
      });

      if (isExist) {
        event[optKey] = eventInit[optKey];
      }
    }

    event.type = typeArg;

    return event;
  }
}

const ie9InitMapping = {
  Event: [
    'bubbles', 'cancelable'
  ],
  UIEvent: [
    'bubbles', 'cancelable', 'view', 'detail'
  ],
  MouseEvent: [
    'bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX',
    'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget'
  ],
  FocusEvent: [
    'bubbles', 'cancelable', 'view', 'detail', 'relatedTarget'
  ]
};

const ie9 = {};

for (let key in ie9InitMapping) {
  ie9[key] = function (typeArg, eventInit) {
    const event = document.createEvent(key);

    event[`init${key}`].apply(event, buildInitEventArgs(typeArg, eventInit, ie9InitMapping[key]));

    return event;
  }
}

const initKey = [
  'bubbles', 'cancelable', 'view', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'char', 'key'
];
const initKeyboard = [
  'bubbles', 'cancelable', 'view', 'char', 'key', 'location', 'modifiers', 'repeat'
];

ie9.KeyboardEvent = function (typeArg, eventInit) {
  const event = document.createEvent('KeyboardEvent');

  if (event.initKeyboardEvent) {
    event.initKeyboardEvent.apply(event, buildInitEventArgs(typeArg, eventInit, initKeyboard));
    
    return event;
  }

  event.initKeyEvent.apply(event, buildInitEventArgs(typeArg, eventInit, initKey));
    
  return event;
};

ie9.InputEvent = ie9.UIEvent;

const constructor = {};

for (let key in ie9) {
  if (isIE8) {
    constructor[key] = ie8[key];
  } else {
    let isExist = true;
    
    try { new window[key]('test') } catch(_) {isExist = false};

    constructor[key] = isExist ?  window[key] : ie9[key];
  }
}

module.exports = constructor;

// touchEvent 判断环境，一个新的环境，区别于isECS和isIE8
// wheelEvent 设备兼容性（苹果）
// scrollEvent 同上