#!/usr/bin/env node

const commander = require('commander');
const save = require('./save');
const give = require('./give');

const command = commander
  .version('0.0.1')
  .option('-s, --save [props...]', 'Save file or folder')
  .parse(process.argv);

if (command.save) save(command.save);
else give(command.args);
