'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var read = require('readline-sync');

var configure = function configure(filename) {
    console.log(filename);
    console.log('Configuring ght.\n');
    if (_fs2.default.existsSync(filename)) {
        var proceed = read.question(filename + ' already exists and will be overwritten. Continue (yes/NO)? ');
        if (proceed.toUpperCase() !== 'YES') process.exit();
        _fs2.default.unlinkSync(filename);
    }

    console.log('Visit https://github.com/settings/tokens to create a personal access token with "repo" scope...\n');

    var config = {
        token: read.question('Personal Access Token: '),
        private: !read.question('Repos private by default? (YES / no): ') || answer.toUpperCase() === 'YES',
        licence_template: read.question('Default licence (gpl-3.0): ') || 'gpl-3.0',
        homepage: read.question('Homepage: ')
    };

    var stream = _fs2.default.createWriteStream(filename);
    stream.on('open', function () {
        stream.write(JSON.stringify(config));
        stream.end();
    });

    console.log('\n' + JSON.stringify(config, null, 2) + '\nWritten to ' + filename + '\n');
};

exports.default = configure;