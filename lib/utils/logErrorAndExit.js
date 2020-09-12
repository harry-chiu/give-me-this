const compose = require('lodash/fp/compose');
const prefixTag = require('./prefixTag');

module.exports = compose(process.exit, console.log, prefixTag('error'));
