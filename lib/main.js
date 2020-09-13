#!/usr/bin/env node

const fs = require('fs');
const commander = require('commander');
const list = require('./list');
const save = require('./save');
const give = require('./give');
const { STORAGE_PATH } = require('./constants');

const isStorageExist = fs.existsSync(STORAGE_PATH);
isStorageExist ? '' : fs.mkdirSync(STORAGE_PATH);

const command = commander
  .version('0.0.1')
  .option('-l, --list [props...]', '檢視當前所有的 key')
  .option('-s, --save [props...]', '儲存檔案')
  .parse(process.argv);

if (command.list) list();
else if (command.save) save(command.save);
else give(command.args);
