const compose = require('lodash/fp/compose');
const prefixTag = require('./prefixTag');

module.exports = compose(console.log, prefixTag('success'));
