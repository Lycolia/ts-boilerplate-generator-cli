import chalk from 'chalk';

/**
 * log banner
 */
const logBanner = ' TS-gen ';

/**
 * put infomation log
 * @param messages
 */
export const infoLog = (...messages: unknown[]) => {
  messages.map((msg) => {
    console.info(chalk.bgGreen.black(logBanner), chalk.white(' INFO '), msg);
  });
};

/**
 * put warning log
 * @param messages
 */
export const warnLog = (...messages: unknown[]) => {
  messages.map((msg) => {
    console.warn(chalk.bgGreen.black(logBanner), chalk.yellow(' WARN '), msg);
  });
};

/**
 * put error log
 * @param messages
 */
export const errorLog = (...messages: unknown[]) => {
  messages.map((msg) => {
    console.error(
      chalk.bgGreen.black(logBanner),
      chalk.bgRed.white(' ERROR '),
      msg
    );
  });
};
