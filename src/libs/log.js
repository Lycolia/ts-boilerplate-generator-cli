// @ts-check

const chalk = require('chalk');

exports.infoLog = (message) => {
  console.info(chalk.yellow('[TS-gen]'), message);
};
exports.errorLog = (message) => {
  console.error(chalk.yellow('[TS-gen]'), chalk.red('[ERROR]'), message);
};
