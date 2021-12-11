let options = require('yargs').scriptName('npx wdio').option('b', {
    alias: 'browser',
    type: 'string',
    describe: 'Set browser for tests',
}).argv;

module.exports = options;
