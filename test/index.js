require('js-polyfills/polyfill.min');
require('js-polyfills/typedarray');

require('mocha/mocha.css');
require('mocha/mocha');

mocha.setup('bdd');

require('./unit');

addEventListener(window, 'load', function () {
    mocha.run();
});