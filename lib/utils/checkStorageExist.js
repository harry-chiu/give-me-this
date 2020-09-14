const fs = require('fs');
const { STORAGE_PATH } = require('./constants');

module.exports = () => {
  const isStorageExist = fs.existsSync(STORAGE_PATH);
  isStorageExist ? '' : fs.mkdirSync(STORAGE_PATH);
};
