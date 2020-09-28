// @ts-check

const chalk = require('chalk');

exports.infoLog = (...message) => {
  console.info(
    chalk.bgGreen.black('[TS-gen]'),
    chalk.white('[INFO]'),
    chalk.green(message)
  );
};
exports.warnLog = (...message) => {
  console.warn(
    chalk.bgGreen.black('[TS-gen]'),
    chalk.yellow('[WARN]'),
    chalk.white(message)
  );
};
exports.errorLog = (...message) => {
  console.error(
    chalk.bgGreen.black('[TS-gen]'),
    chalk.bgRed.white('[ERROR]'),
    chalk.white(message)
  );
};
