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
  const isValid = targetStatus.isFile() || targetStatus.isDirectory();
  isValid ? '' : logErrorAndExit('檔案類型錯誤');

  const filename = getFilename(target);
  const storage = path.resolve(STORAGE_PATH, key);
  const isStorageExist = fs.existsSync(storage);
  isStorageExist ? '' : fs.mkdirSync(storage);

  // saveToHere -> 儲存路徑
  // options    -> clobber 強制覆蓋
  const saveToHere = path.resolve(storage, isFile ? filename : '');
  const options = { clobber: true };
  const callback = error => (error ? logErrorAndExit(error) : '');

  // rimraf -> 清空資料夾
  // ncp    -> 複製目標
  rimraf(`${storage}/*`, callback);
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
