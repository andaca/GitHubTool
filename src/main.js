import { configFile } from './config'
import configure from './configure-ght'
import initRepository from './initialise-repository'

require('yargs')
    .usage('$0 <cmd> [args]')

    .command('configure', 'Configure your ght settings', {}, () => configure(configFile))

    .command('init [name]', 'Initialise a new repository', {
        name: {
            describe: 'Name of the repository',
            demandOption: true
        },
        description: {
            alias: 'd',
            describe: 'Project description',
            default: ''
        },
        clone: {
            alias: 'c',
            describe: 'Automatically clone the repository after creation',
            default: false
        },
        gitignore_template: {
            alias: 'it',
            describe: 'Add a .gitignore template file',
            default: false
        },
        public: {
            alias: 'p',
            describe: 'Make the repository public',
            default: false
        },
        auto_init: {
            alias: 'ai',
            describe: 'Create an inital commit with empty README',
            default: false
        },
        'verbose': {
            alias: 'v',
            describe: 'Show verbose output',
            default: false
        }
    }, argv => initRepository(argv))
    .demandCommand(1, `Type 'ght [command] --help' for more info`)
    .help()
    .argv