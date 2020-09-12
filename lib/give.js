const fs = require('fs');
const ncp = require('ncp');
const path = require('path');
const compose = require('lodash/fp/compose');
const includes = require('lodash/fp/includes');
const { STORAGE_PATH } = require('./constants');
const logSuccess = require('./utils/logSuccess');
const logErrorAndExit = require('./utils/logErrorAndExit');

const moreThanZero = xs => xs.length > 0;

module.exports = input => {
  input ? '' : logErrorAndExit('請輸入 Key 作為第一個參數');

  // key    -> 從 storage 找出對應的 key
  // target -> 指定取出後資料夾的名稱
  const [key, target] = input;
  const checkKeyExistAt = compose(includes(key), fs.readdirSync);
  checkKeyExistAt(STORAGE_PATH) ? '' : logErrorAndExit('Key 不存在');

  const checkFileExistAt = compose(moreThanZero, fs.readdirSync);
  const storage = path.resolve(STORAGE_PATH, key);
  checkFileExistAt(storage) ? '' : logErrorAndExit('這個 Key 沒有任何檔案');

  const directoryName = target ? target : key;
  const copyToHere = path.resolve(process.cwd(), directoryName);
  const callback = error => (error ? logErrorAndExit(error) : '');
  ncp(storage, copyToHere, callback);

  logSuccess(`將 ${key} 複製到 ${copyToHere}`);
};
