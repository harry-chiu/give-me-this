const chalk = require('chalk');

const withSpace = x => ' ' + x;

const SUCCESS_TAG = chalk.green('[成功]');
const ERROR_TAG = chalk.red('[錯誤]');
const INFO_TAG = chalk.cyan('[資訊]');

module.exports = tag => x => {
  switch (tag) {
    case 'success':
      return SUCCESS_TAG + withSpace(x);
    case 'error':
      return ERROR_TAG + withSpace(x);
    case 'info':
      return INFO_TAG + withSpace(x);
  }
};
