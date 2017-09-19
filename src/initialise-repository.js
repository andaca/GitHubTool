import fetch from 'node-fetch'
import { pipe } from 'rambda'
import { exec } from 'child_process'
import { config } from './config'


const objectSubset = (object, fields) =>
  fields.reduce((obj, field) => {
    obj[field] = object[field]
    return obj
  }, {})

const stringify = obj =>
  Object.keys(obj).reduce((str, key) =>
    str.concat(`${key}: ${obj[key]}\n`)
    , '')

const makeRequestBody = opts => objectSubset(opts,
  ['name', 'description', 'homepage', 'private', 'auto_init', 'gitignore_template'])

const makeOutputFields = verbose => data => {
  if (data.Errors) {
    return { Errors: data.Errors }
  }
  return (verbose)
    ? data
    : objectSubset(data, ['Errors', 'clone_url'])
}

const post = (token, body) =>
  fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `token ${token}`,
    },
    body: body
  })

const cloneRepo = url =>
  exec(`git clone ${url}`, (error, stdout, stderr) => {
    [error, stdout, sterr].forEach(x => { if (x) console.log(x) })
  })


const initRepository = (opts, token) => {
  post(token, JSON.stringify(makeRequestBody(opts)))
    .then(response => response.json())
    .then(data => {
      pipe(
        //makeOutputFields(opts.verbose),
        stringify,
        console.log
      )(data)
    })
    .catch(error => console.log(error))
}




// begin:: exports for testing
export {
  stringify as _stringify,
  objectSubset as _objectSubset
}
// end:: exports for testing

export default initRepository
