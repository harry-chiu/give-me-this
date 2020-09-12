const chalk = require('chalk');

const withSpace = x => ' ' + x;

const SUCCESS_TAG = chalk.green('[Success]');
const ERROR_TAG = chalk.red('[Error]');

module.exports = status => x => {
  switch (status) {
    case 'success':
      return SUCCESS_TAG + withSpace(x);
    case 'error':
      return ERROR_TAG + withSpace(x);
  }
};
