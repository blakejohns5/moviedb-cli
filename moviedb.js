#! /usr/bin/env node 
// above...allow calling of filename instead of node, to start program

import * as dotenv from 'dotenv'
dotenv.config()
import { program } from 'commander';


import { fetchData } from './src/fetch.js'
import { getHelpers } from './src/helpers.js'

program
  .version('0.0.1')
  .description('Film Database CLI Tool')


program.command('get-people')
  .description('Make a network request to fetch the most popular people')
  .requiredOption('--popular, -p', 'Fetch the most popular people')
  .requiredOption('--page <number>', 'Specify the page of results to fetch')
  .action((options) => {
    fetchData(getHelpers(options))

  })
  


program.command('get-person')
  .description('Make a network request to fetch the data of a single person')
  .requiredOption('--id, -i <idNumber>', 'The id of the person')
  .action((options) => {
    fetchData(getHelpers(options))
  });



program.parse(process.argv)