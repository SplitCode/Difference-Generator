#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')

//   .option('-f, --format <type>', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information');
//   .arguments('<filepath1> <filepath2>')

program.parse();
