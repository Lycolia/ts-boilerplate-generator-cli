import chalk from 'chalk';

export namespace MyLog {
  /**
   * log banner
   */
  const logBanner = ' TSG ';

  /**
   * put infomation log
   * @param messages
   */
  export const info = (...messages: unknown[]) => {
    messages.forEach((msg) => {
      console.info(chalk.bgGreen.black(logBanner), chalk.white(' INFO '), msg);
    });
  };

  /**
   * put warning log
   * @param messages
   */
  export const warn = (...messages: unknown[]) => {
    messages.forEach((msg) => {
      console.warn(chalk.bgGreen.black(logBanner), chalk.yellow(' WARN '), msg);
    });
  };

  /**
   * put error log
   * @param messages
   */
  export const error = (...messages: unknown[]) => {
    messages.forEach((msg) => {
      console.error(
        chalk.bgGreen.black(logBanner),
        chalk.bgRed.white(' ERROR '),
        msg
      );
    });
  };
}
