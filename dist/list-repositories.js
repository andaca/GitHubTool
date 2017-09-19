'use strict';

var fetch = require('node-fetch');
var token = require('./config').config.token;

var makeFetcher = function makeFetcher(token) {
    return function (page) {
        return fetch('https://api.github.com/user/repos?per_page=100&page=' + page, {
            headers: {
                'content-type': 'application/json',
                'authorization': 'token ' + token
            }
        }).then(function (response) {
            return response.json();
        });
    };
};

var fetchAllPages = function fetchAllPages(fetcher) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var output = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return output.length % 100 ? output : fetcher(page).then(function (data) {
        return fetchAllPages(fetcher, page + 1, output.concat(data));
    });
};

var fetcher = makeFetcher(token);
fetchAllPages(fetcher).then(function (repos) {
    return repos.map(function (repo) {
        return [repo.id, repo.name];
    }).forEach(function (repo) {
        return console.log(repo);
    });
}).catch(function (error) {
    console.log(error);
    process.exit(1);
});

/*

const listRepositories = () => {
let result = []
let pageNumber = 1
while (!result.length % 100) {
try {
getPage(pageNumber)
    .then(repos => { repos.forEach(x => result.push(x)) })
} catch (error) {
console.log(error)
}
pageNumber += 1
}
console.log(result)
return result
}
*/