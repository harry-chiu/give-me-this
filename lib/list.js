const fs = require('fs');
const forEach = require('lodash/fp/forEach');
const logInfo = require('./utils/logInfo');
const { STORAGE_PATH } = require('./constants');

module.exports = () => {
  const keysInStorage = fs.readdirSync(STORAGE_PATH);
  const isEmpty = xs => xs.length < 1;
  isEmpty(keysInStorage) ? logInfo('目前沒有任何 Key') : logInfo('所有 Key:');

  const logAll = forEach(console.log);
  logAll(keysInStorage);
};
