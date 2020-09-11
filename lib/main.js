#!/usr/bin/env node

const save = require('./save');
const commander = require('commander');

const command = commander
  .version('0.0.1')
  .option('-s, --save [props...]', 'Save file or folder')
  .parse(process.argv);

if (command.save) save(command.save);
