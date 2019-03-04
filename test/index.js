require('js-polyfills/polyfill.min');
require('js-polyfills/typedarray');
require('js-polyfills/web.min');

require('mocha/mocha.css');
require('mocha/mocha');

mocha.setup('bdd');

require('./unit');

window.addEventListener('load', function () {
    mocha.run();
});