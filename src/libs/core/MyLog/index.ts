import chalk from 'chalk';

/**
 * log banner
 */
const logBanner = ' TSG ';

/**
 * put infomation log
 * @param messages
 */
const info = (...messages: unknown[]) => {
  messages.forEach((msg) => {
    console.info(chalk.bgGreen.black(logBanner), chalk.white(' INFO '), msg);
  });
};

/**
 * put warning log
 * @param messages
 */
const warn = (...messages: unknown[]) => {
  messages.forEach((msg) => {
    console.warn(chalk.bgGreen.black(logBanner), chalk.yellow(' WARN '), msg);
  });
};

/**
 * put error log
 * @param messages
 */
const error = (...messages: unknown[]) => {
  messages.forEach((msg) => {
    console.error(
      chalk.bgGreen.black(logBanner),
      chalk.bgRed.white(' ERROR '),
      msg
    );
  });
};

export const MyLog = {
  info,
  warn,
  error,
};
