import chalk from 'chalk';

/**
 * log banner
 */
const logBanner = '[TS-gen]';

/**
 * put infomation log
 * @param messages
 */
export const infoLog = (...messages: unknown[]) => {
  console.info(
    chalk.bgGreen.black(logBanner),
    chalk.white('[INFO]'),
    chalk.green(messages)
  );
};

/**
 * put warning log
 * @param messages
 */
export const warnLog = (...messages: unknown[]) => {
  console.warn(
    chalk.bgGreen.black(logBanner),
    chalk.yellow('[WARN]'),
    chalk.white(messages)
  );
};

/**
 * put error log
 * @param messages
 */
export const errorLog = (...messages: unknown[]) => {
  console.error(
    chalk.bgGreen.black(logBanner),
    chalk.bgRed.white('[ERROR]'),
    chalk.white(messages)
  );
};