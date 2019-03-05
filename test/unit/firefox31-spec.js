const {
    MouseEvent,
	UIEvent,
	KeyboardEvent,
	FocusEvent,
    Event,
    InputEvent
} = require('../../src');

const assert = require('assert');

describe('Firefox31 and above browser testing', function () {
    describe('Event API test', function () {
        it('Create event normally', function () {
            const event = new Event('test', {
                bubbles: false
            });

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles,
                isEvent: event instanceof window.Event
            }, {
                type: 'test', bubbles: false, isEvent: true
            });
        });

        it('Create event retrive without argument', function () {
            const event = new Event('test');

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'test', bubbles: false
            });
        });
    });

    describe('UIEvent API test', function () {
        it('Create UIEvent normally', function () {
            const event = new UIEvent('test', {
                bubbles: false
            });

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles,
                isUIEvent: event instanceof window.UIEvent
            }, {
                type: 'test', bubbles: false,
                isUIEvent: true
            });
        });

        it('Create UIEvent retrive without argument', function () {
            const event = new UIEvent('load');

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'load', bubbles: false
            });
        });
    });

    describe('MouseEvent API test', function () {
        it('Create MouseEvent normally', function () {
            const event = new MouseEvent('mousedown', {
                bubbles: true, test: ''
            });

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles,
                isMouseEvent: event instanceof window.MouseEvent,
                test: undefined
            }, {
                type: 'mousedown', bubbles: true,
                isMouseEvent: true, test: undefined
            });
        });

        it('Create MouseEvent retrive without argument', function () {
            const event = new MouseEvent('mousedown');

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'mousedown', bubbles: false
            });
        });
    });

    describe('FocusEvent API test', function () {
        it('Create FocusEvent normally', function () {
            const event = new FocusEvent('focusin', {
                bubbles: true, test: ''
            });

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles,
                isFocusEvent: event instanceof window.FocusEvent,
                test: undefined
            }, {
                type: 'focusin', bubbles: true,
                isFocusEvent: true, test: undefined
            });
        });

        it('Create FocusEvent retrive without argument', function () {
            const event = new FocusEvent('focusin');

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'focusin', bubbles: false
            });
        });
    });

    describe('KeyboardEvent API test', function () {
        it('Create KeyboardEvent normally', function () {
            const event = new KeyboardEvent('keypress', {
                bubbles: true, test: ''
            });

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles,
                isKeyboardEvent: event instanceof window.KeyboardEvent,
                test: undefined
            }, {
                type: 'keypress', bubbles: true,
                isKeyboardEvent: true, test: undefined
            });
        });

        it('Create KeyboardEvent retrive without argument', function () {
            const event = new KeyboardEvent('keypress');

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'keypress', bubbles: false
            });
        });
    });

    describe('InputEvent API test', function () {
        it('Create InputEvent normally', function () {
            const event = new InputEvent('input', {
                bubbles: true, test: ''
            });

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles,
                isUIEvent: event instanceof window.InputEvent,
                test: undefined
            }, {
                type: 'input', bubbles: true,
                isUIEvent: true, test: undefined
            });
        });

        it('Create InputEvent retrive without argument', function () {
            const event = new InputEvent('input');

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'input', bubbles: false
            });
        });
    });
});