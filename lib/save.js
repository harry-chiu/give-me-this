const fs = require('fs');
const ncp = require('ncp');
const path = require('path');
const rimraf = require('rimraf');
const { STORAGE_PATH } = require('./constants');
const logSuccess = require('./utils/logSuccess');
const logErrorAndExit = require('./utils/logErrorAndExit');

const withPath = x => y => path.resolve(x, y);
const withExecPath = withPath(process.cwd());
const getFilename = x => x.replace(/^.*[\\\/]/, '');

const saveToStorage = (key, target) => {
  const targetStatus = fs.lstatSync(target);
  const isFile = targetStatus.isFile()
  const isDirectory = targetStatus.isDirectory()
  const isValid = isFile || isDirectory;
  isValid ? '' : logErrorAndExit('檔案類型錯誤');
  
  const filename = getFilename(target);
  const isStorageExist = fs.existsSync(STORAGE_PATH);
  isStorageExist ? '' : fs.mkdirSync(STORAGE_PATH);

  const storageWithKey = path.resolve(STORAGE_PATH, key);
  const isStorageWithKeyExist = fs.existsSync(storageWithKey);
  isStorageWithKeyExist ? '' : fs.mkdirSync(storageWithKey);

  // saveToHere -> 儲存路徑
  // options    -> clobber 強制覆蓋
  const saveToHere = path.resolve(storageWithKey, isFile ? filename : '');
  const options = { clobber: true };
  const callback = error => (error ? logErrorAndExit(error) : '');

  // rimraf -> 清空資料夾
  // ncp    -> 複製目標
  rimraf(`${storageWithKey}/*`, callback);
  ncp(target, saveToHere, options, callback);

  logSuccess(`已將檔案儲存至 Key -> "${key}"`);
};

module.exports = props => {
  // key       -> 與 storage 對應的 key
  // inputPath -> 使用者輸入的相對路徑
  const [key, inputPath] = props;
  const target = withExecPath(inputPath);

  const isTargetExist = fs.existsSync(target);

  isTargetExist
    ? saveToStorage(key, target)
    : logErrorAndExit('目標不存在，請確認路徑是否正確');
};
