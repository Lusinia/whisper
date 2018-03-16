// keys.js - figure out what set of credetials to return
if (process.env['NODE_ENV'] === 'production') {
    module.exports = require('./prod');
} else {
    // we are id development - return the dev keys
    module.exports = require('./dev');
}