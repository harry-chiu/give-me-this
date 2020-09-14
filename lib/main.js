#!/usr/bin/env node

const commander = require('commander');
const list = require('./list');
const save = require('./save');
const give = require('./give');
const checkStorageExist = require('./utils/checkStorageExist');

const command = commander
  .version('0.0.1')
  .option('-l, --list [props...]', '檢視當前所有的 key')
  .option('-s, --save [props...]', '儲存檔案')
  .parse(process.argv);

checkStorageExist();

if (command.list) list();
else if (command.save) save(command.save);
else give(command.args);
