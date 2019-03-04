const {
    MouseEvent,
	UIEvent,
	KeyboardEvent,
	FocusEvent,
    Event,
    InputEvent,
    CustomEvent
} = require('../../src');
const assert = require('assert');

describe('IE8 Browser Testing', function () {
    describe('Event API test', function () {
        it('Create event retrive with argument', function () {
            const event = new Event('test', {
                bubbles: false
            });

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'test', bubbles: false
            });
        });

        it('Create event retrive without config argument', function () {
            const event = new Event('test');

            assert.deepEqual({
                type: event.type, bubbles: event.bubbles
            }, {
                type: 'test', bubbles: false
            });
        });

        it('Create event retrive abnormally', function () {
            const event = new Event('');
        });
    });

    describe('UIEvent API test', function () {
        it('Create UIEvent retrive with argument', function () {

        });

        it('Create UIEvent retrive without argument', function () {

        });

        it('Create UIEvent retrive abnormally', function () {

        });
    });

    describe('MouseEvent API test', function () {
        it('Create MouseEvent retrive with argument', function () {

        });

        it('Create MouseEvent retrive without argument', function () {

        });

        it('Create MouseEvent retrive abnormally', function () {

        });
    });

    describe('FocusEvent API test', function () {
        it('browser can not support API', function () {

        });
    });

    describe('KeyboardEvent API test', function () {
        it('Create CustomEvent retrive with argument', function () {

        });

        it('Create CustomEvent retrive without argument', function () {

        });

        it('Create CustomEvent retrive abnormally', function () {

        });
    });

    describe('InputEvent API test', function () {
        it('browser can not support API', function () {

        });
    });

    describe('CustomEvent API test', function () {
        it('browser can not support API', function () {

        });
    });
});