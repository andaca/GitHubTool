import fetch from 'node-fetch'
import config from './config'
const token = config.token

const makeFetcher = token => page =>
  fetch(`https://api.github.com/user/repos?per_page=100&page=${page}`, {
    headers: {
      'content-type': 'application/json',
      'authorization': `token ${token}`,
    },
  }).then(response => response.json())

const fetchAllPages = (fetcher, page = 1, output = []) =>
  (output.length % 100)
    ? output
    : fetcher(page)
      .then(data => fetchAllPages(fetcher, page + 1, output.concat(data)))

const fetcher = makeFetcher(token)
fetchAllPages(fetcher)
  .then(repos => repos
    .map(repo => [repo.id, repo.name])
    .forEach(repo => console.log(repo))
  )
  .catch(error => {
    console.log(error)
    process.exit(1)
  })

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
