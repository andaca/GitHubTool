import fetch from 'node-fetch'
import { exec } from 'child_process'
import { config } from './config'

const makePost = token => (endpoint, body) =>
    fetch('https://api.github.com' + endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `token ${token}`,
        },
        body: body
    })


const cloneRepo = url =>
    exec(`git clone ${url}`, (error, stdout, stderr) => {
        if (error)
            console.log(error)
        if (stdout)
            console.log(stdout)
        if (stderr)
            console.log(stderr)
    })

const initRepository = opts => {
    const post = makePost(config.token)
    post('/user/repos', JSON.stringify({
        name: opts.name,
        description: opts.description,
        homepage: opts.homepage,
        private: opts.private,
        auto_init: opts.auto_init,
        gitignore_template: opts.gitignore_template
    }))
        .then(response => response.json())
        .then(response => {
            if (response.errors)
                console.log(JSON.stringify(response, null, 2))
            else if (opts.verbose)
                console.log(JSON.stringify(response, null, 2))
            else
                console.log(`Respository available at ${response.clone_url}`)

            if (opts.clone)
                cloneRepo(response.clone_url)
        })
        .catch(error => console.log(JSON.stringify(error, null, 2)))
}


export default initRepository
