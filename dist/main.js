'use strict';

var _config = require('./config');

var _configureGht = require('./configure-ght');

var _configureGht2 = _interopRequireDefault(_configureGht);

var _initialiseRepository = require('./initialise-repository');

var _initialiseRepository2 = _interopRequireDefault(_initialiseRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('yargs').usage('$0 <cmd> [args]').command('configure', 'Configure your ght settings', {}, function () {
    return (0, _configureGht2.default)(_config.configFile);
}).command('init [name]', 'Initialise a new repository', {
    name: {
        describe: 'Name of the repository',
        demandOption: true
    },
    description: {
        alias: 'd',
        describe: 'Project description',
        default: ''
    },
    clone: {
        alias: 'c',
        describe: 'Automatically clone the repository after creation',
        default: false
    },
    gitignore_template: {
        alias: 'it',
        describe: 'Add a .gitignore template file',
        default: false
    },
    public: {
        alias: 'p',
        describe: 'Make the repository public',
        default: false
    },
    auto_init: {
        alias: 'ai',
        describe: 'Create an inital commit with empty README',
        default: false
    },
    'verbose': {
        alias: 'v',
        describe: 'Show verbose output',
        default: false
    }
}, function (argv) {
    return (0, _initialiseRepository2.default)(argv);
}).demandCommand(1, 'Type \'ght [command] --help\' for more info').help().argv;