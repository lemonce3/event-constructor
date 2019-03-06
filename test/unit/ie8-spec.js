const {
    MouseEvent,
	UIEvent,
	KeyboardEvent,
	FocusEvent,
    Event,
    InputEvent
} = require('../../src');
const assert = require('assert');

describe('IE8 Browser Testing', function () {
    describe('Event API test', function () {
        it('Create event normally', function () {
            const event = new Event('test', {
                cancelBubble: false, test: '123'
            });

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'test', cancelBubble: false
            });
        });

        it('Create event retrive without config argument', function () {
            const event = new Event('test');

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'test', cancelBubble: false
            });
        });
    });

    describe('UIEvent API test', function () {
        it('Create UIEvent normally', function () {
            const event = new UIEvent('load', {
                cancelBubble: true
            });

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'load', cancelBubble: true
            });
        });

        it('Create UIEvent retrive without argument', function () {
            const event = new UIEvent('load');

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'load', cancelBubble: false
            });
        });
    });

    describe('MouseEvent API test', function () {
        it('Create MouseEvent normally', function () {
            const event = new MouseEvent('mousedown', {
                cancelBubble: false, keyCode: 13, button: 1
            });

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble, keyCode: event.keyCode,
                button: event.button
            }, {
                type: 'mousedown', cancelBubble: false, keyCode: 0, button: 1
            });
        });

        it('Create MouseEvent retrive without argument', function () {
            const event = new MouseEvent('mousedown');

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'mousedown', cancelBubble: false
            });
        });
    });

    describe('FocusEvent API test', function () {
        it('Create FocusEvent normally', function () {
            const event = new FocusEvent('focusin', {
                cancelBubble: false
            });

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'focusin', cancelBubble: false
            });
        });

        it('Create FocusEvent retrive without argument', function () {
            const event = new FocusEvent('focusin');

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'focusin', cancelBubble: false
            });
        });
    });

    describe('KeyboardEvent API test', function () {
        it('Create KeyboardEvent normally', function () {
            const event = new KeyboardEvent('keypress', {
                cancelBubble: false, keyCode: 13
            });

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble, keyCode: event.keyCode
            }, {
                type: 'keypress', cancelBubble: false, keyCode: 13
            });
        });

        it('Create KeyboardEvent retrive without argument', function () {
            const event = new KeyboardEvent('keypress');

            assert.deepEqual({
                type: event.type, cancelBubble: event.cancelBubble
            }, {
                type: 'keypress', cancelBubble: false
            });
        });
    });

    describe('InputEvent API test', function () {
        it('browser can not support API', function () {
            assert.equal(InputEvent, null);
        });
    });
});