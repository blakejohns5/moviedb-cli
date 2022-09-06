#! /usr/bin/env node 
// above...allow calling of filename instead of node, to start program

import * as dotenv from 'dotenv'
dotenv.config()

import { program } from 'commander';

import getPopularPeople from './src/apis.js'

// const spinner = ora('Fetching data for popular people...')

program
    .version('0.0.1')
    .description('Film Database CLI Tool')

program.command('get-people')
    .description('Make a network request to fetch the most popular people')
    .requiredOption('--popular, -p', 'Fetch the most popular people')
    .requiredOption('--page <number>', 'Specify the page of results to fetch')
    .action((options) => getPopularPeople(options));


program.parse(process.argv)