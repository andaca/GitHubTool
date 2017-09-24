#!/usr/bin/env node

import yargs from 'yargs'
import { config, configFile } from './config'
import configure from './configure-ght'
import initialiseRepository from './initialise-repository'
import listRepositories from './list-repositories'
import removeRepository from './remove-repository'


yargs
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
      alias: 'g',
      describe: 'Add a .gitignore template file',
      default: false
    },
    public: {
      alias: 'p',
      describe: 'Make the repository public',
      default: false
    },
    auto_init: {
      alias: 'a',
      describe: 'Create an inital commit with empty README',
      default: false
    },
    'verbose': {
      alias: 'v',
      describe: 'Show verbose output',
      default: false
    }
  }, argv => initialiseRepository(argv, config.token))

  .command('list', 'list all repositories', {}, () => listRepositories(config.token))

  .command('remove [repo-name]', 'Remove a repository from GitHub. THIS IS IRREVERSABLE!', {
    repositoryName: {
      describe: 'Name of the repository',
      demandOption: true
    },
    force: {
      alias: 'f',
      describe: 'Do not ask for confirmation',
      default: false
    }
  }, argv => removeRepository(argv, config.username, config.token))

  .demandCommand(1, 'Type "ght [command] --help" for more info')
  .help()
  .argv