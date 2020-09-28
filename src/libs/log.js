// @ts-check

const chalk = require('chalk');

exports.infoLog = (...message) => {
  console.info(chalk.bgGreen.black('[TS-gen]'), '[INFO]', chalk.green(message));
};
exports.warnLog = (...message) => {
  console.warn(
    chalk.bgGreen.black('[TS-gen]'),
    chalk.yellow('[WARN]'),
    message
  );
};
exports.errorLog = (...message) => {
  console.error(
    chalk.bgGreen.black('[TS-gen]'),
    chalk.bgRed.white('[ERROR]'),
    message
  );
};
