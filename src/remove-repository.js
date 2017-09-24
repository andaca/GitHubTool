import fetch from 'node-fetch'

const showOutput = (responseData, verbose) => {
  if ('error' in responseData)
    console.log(JSON.stringify(responseData.error), null, 2)
  else
    console.log(JSON.stringify(responseData, null, 2))
}

const removeRepository = (opts, username, token) => {
  console.log(`https://api.github.com/repos/${username}/${opts.repositoryName}`)
  fetch(`https://api.github.com/repos/${username}/${opts.repositoryName}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': `token ${token}`,
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => showOutput(data))
    .catch(error => console.log(error))
}


export default removeRepository
