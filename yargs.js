let options = require('yargs')
    .scriptName('npx wdio')
    .option('b', {
        alias: 'browser',
        type: 'string',
        describe: 'Set browser for tests',
    })
    .option('s', {
        alias: 'suite',
        type: 'string',
        describe: 'Set suite for testing',
    }).argv;

module.exports = options;
