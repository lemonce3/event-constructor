const {Event, MouseEvent, KeyboardEvent,
    FocuseEvent, UIEvent, CustomEvent} = require('../src/index');

const event = new Event('test', {
    bubbles: false
}), 
mouseEvent = new MouseEvent('mousedown', {
    clientX: 100
}),
keyBoardEvent = new KeyboardEvent('keydown', {
    altKey: true
}),
focuseEvent = new FocuseEvent('focusin', {
    bubbles: false
}),
uiEvent = new UIEvent('', {
    bubbles: true
}),
customEvent = new CustomEvent('', {
    detail: '11'
});

console.log(event, mouseEvent, keyBoardEvent, focuseEvent, uiEvent, customEvent);