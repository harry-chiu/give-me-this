const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const map = require('lodash/fp/map');
const curry = require('lodash/fp/curry');
const compose = require('lodash/fp/compose');

const withPath = x => y => path.resolve(x, y);
const withExecPath = withPath(process.cwd());

const exit = () => process.exit();

const redText = text => chalk.red(text);
const logError = text => console.error(redText('[Error] '), text);
const exitAndLogError = compose(exit, logError);

const greenText = text => chalk.green(text);
const log = text => console.log(greenText('[Success] '), text);
const exitAndLog = compose(exit, log);

const onlyFilename = path => path.replace(/^.*[\\\/]/, '');
const saveFile = curry((key, target) => {
  const storagePath = path.resolve(__dirname, '../storage');
  const targetPath = path.resolve(storagePath, key);
  if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);

  const filename = onlyFilename(target);
  const copyToHere = path.resolve(targetPath, filename);
  fs.copyFile(target, copyToHere, exitAndLog(`Save as key -> ${key}`));
});

module.exports = props => {
  // key       -> 與 storage 對應的 key
  // inputPath -> 使用者輸入的相對路徑
  const [key, inputPath] = props;
  const target = withExecPath(inputPath);

  const isTargetExist = fs.existsSync(target);
  if (!isTargetExist) exitAndLogError('目標不存在，請確認路徑是否正確');

  const fileStatus = fs.lstatSync(target);

  const isFile = fileStatus.isFile();
  if (isFile) saveFile(key, target);

  const isDirectory = fileStatus.isDirectory();
  if (isDirectory) {
    const filesInTarget = fs.readdirSync(target);
    const withTargetDir = withPath(target);
    const targets = map(withTargetDir, filesInTarget);

    const saveFileWithKey = saveFile(key);
    targets.forEach(saveFileWithKey);
  }
};
