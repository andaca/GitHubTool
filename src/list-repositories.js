import fetch from 'node-fetch'


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


const listRepositories = token => {
  const fetcher = makeFetcher(token)
  fetchAllPages(fetcher)
    .then(data => data
      .map(repo => repo.name)
      .forEach(repo => console.log(repo))
    )
    .catch(error => console.log(error))
}

export default listRepositories

