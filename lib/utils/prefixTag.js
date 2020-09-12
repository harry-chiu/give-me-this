const chalk = require('chalk');

const withSpace = x => ' ' + x;

const SUCCESS_TAG = chalk.green('[成功]');
const ERROR_TAG = chalk.red('[錯誤]');

module.exports = status => x => {
  switch (status) {
    case 'success':
      return SUCCESS_TAG + withSpace(x);
    case 'error':
      return ERROR_TAG + withSpace(x);
  }
};
