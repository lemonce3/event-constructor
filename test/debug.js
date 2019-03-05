const {
    MouseEvent,
	UIEvent,
	KeyboardEvent,
	FocusEvent,
    Event,
    InputEvent
} = require('../src/index');
    
const event = new Event('test', {
    bubbles: false
}), 
mouseEvent = new MouseEvent('mousedown', {
    clientX: 100
}),
keyBoardEvent = new KeyboardEvent('keydown', {
    altKey: true
}),
focusEvent = new FocusEvent('focusin', {
    bubbles: false
}),
uiEvent = new UIEvent('', {
    bubbles: true
}),
inputEvent = new InputEvent('', {
    bubbles: true
});

console.log(event, mouseEvent, keyBoardEvent, focusEvent, uiEvent, inputEvent);