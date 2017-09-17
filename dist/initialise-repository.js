'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _child_process = require('child_process');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makePost = function makePost(token) {
    return function (endpoint, body) {
        return (0, _nodeFetch2.default)('https://api.github.com' + endpoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': 'token ' + token
            },
            body: body
        });
    };
};

var cloneRepo = function cloneRepo(url) {
    return (0, _child_process.exec)('git clone ' + url, function (error, stdout, stderr) {
        if (error) console.log(error);
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
    });
};

var initRepository = function initRepository(opts) {
    var post = makePost(_config.config.token);
    post('/user/repos', JSON.stringify({
        name: opts.name,
        description: opts.description,
        homepage: opts.homepage,
        private: opts.private,
        auto_init: opts.auto_init,
        gitignore_template: opts.gitignore_template
    })).then(function (response) {
        return response.json();
    }).then(function (response) {
        if (response.errors) console.log(JSON.stringify(response, null, 2));else if (opts.verbose) console.log(JSON.stringify(response, null, 2));else console.log('Respository available at ' + response.clone_url);

        if (opts.clone) cloneRepo(response.clone_url);
    }).catch(function (error) {
        return console.log(JSON.stringify(error, null, 2));
    });
};

exports.default = initRepository;