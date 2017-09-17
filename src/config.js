import os from 'os'
import fs from 'fs'

export const configFile = (() => os.homedir() + '/.ght_conf')()

export const config = (() => {
    try { return JSON.parse(fs.readFileSync(configFile)) }
    catch (error) {
        if (error.code === 'ENOENT')
            console.log('No configuration file found. Run `ght configure`')
        else
            console.log(`Unexpected Error: \n ${JSON.stringify(error, null, 2)}`)
        process.exit(1)
    }
})()

