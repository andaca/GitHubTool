'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.configFile = undefined;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configFile = exports.configFile = function () {
    return _os2.default.homedir() + '/.ght_conf';
}();

var config = exports.config = function () {
    try {
        return JSON.parse(_fs2.default.readFileSync(configFile));
    } catch (error) {
        if (error.code === 'ENOENT') console.log('No configuration file found. Run `ght configure`');else console.log('Unexpected Error: \n ' + JSON.stringify(error, null, 2));
        process.exit(1);
    }
}();