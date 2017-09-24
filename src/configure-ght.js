import fs from 'fs'
import os from 'os'
const read = require('readline-sync')

import { configFile } from './config'


const configure = filename => {
  console.log(filename)
  console.log('Configuring ght.\n')
  if (fs.existsSync(filename)) {
    const proceed = read.question(`${filename} already exists and will be overwritten. Continue (yes/NO)? `)
    if (proceed.toUpperCase() !== 'YES')
      process.exit()
    fs.unlinkSync(filename)
  }

  console.log('Visit https://github.com/settings/tokens to create a personal access token with "repo" scope...\n')

  const config = {
    username: read.question('Github username: '),
    token: read.question('Personal Access Token: '),
    private: !read.question('Repos private by default? (YES / no): ')
    || answer.toUpperCase() === 'YES',
    licence_template: read.question(
      'Default licence (gpl-3.0): ')
    || 'gpl-3.0',
    homepage: read.question('Homepage: ')
  }

  const stream = fs.createWriteStream(filename)
  stream.on('open', () => {
    stream.write(JSON.stringify(config))
    stream.end()
  })

  console.log(`\n${JSON.stringify(config, null, 2)}\nWritten to ${filename}\n`)
}

export default configure
