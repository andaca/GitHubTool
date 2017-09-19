'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._objectSubset = exports._stringify = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _rambda = require('rambda');

var _child_process = require('child_process');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectSubset = function objectSubset(object, fields) {
  return fields.reduce(function (obj, field) {
    obj[field] = object[field];
    return obj;
  }, {});
};

var stringify = function stringify(obj) {
  return Object.keys(obj).reduce(function (str, key) {
    return str.concat(key + ': ' + obj[key] + '\n');
  }, '');
};

var makeRequestBody = function makeRequestBody(opts) {
  return objectSubset(opts, ['name', 'description', 'homepage', 'private', 'auto_init', 'gitignore_template']);
};

var makeOutputFields = function makeOutputFields(verbose) {
  return function (data) {
    if (data.Errors) {
      return { Errors: data.Errors };
    }
    return verbose ? data : objectSubset(data, ['Errors', 'clone_url']);
  };
};

var post = function post(token, body) {
  return (0, _nodeFetch2.default)('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': 'token ' + token
    },
    body: body
  });
};

var cloneRepo = function cloneRepo(url) {
  return (0, _child_process.exec)('git clone ' + url, function (error, stdout, stderr) {
    [error, stdout, sterr].forEach(function (x) {
      if (x) console.log(x);
    });
  });
};

var initRepository = function initRepository(opts, token) {
  post(token, JSON.stringify(makeRequestBody(opts))).then(function (response) {
    return response.json();
  }).then(function (data) {
    (0, _rambda.pipe)(
    //makeOutputFields(opts.verbose),
    stringify, console.log)(data);
  }).catch(function (error) {
    return console.log(error);
  });
};

// begin:: exports for testing
exports._stringify = stringify;
exports._objectSubset = objectSubset;
// end:: exports for testing

exports.default = initRepository;