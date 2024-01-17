import { OptionValues } from 'commander';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

export namespace CommanderUtil {
  export const parseOpts = (opts: OptionValues) => {
    if (typeof opts.author !== 'string') {
      throw new MyError(ErrorReasons.invalidAuthorOptions);
    } else if (typeof opts.description !== 'string') {
      throw new MyError(ErrorReasons.invalidDescriptionOptions);
    } else if (typeof opts.license !== 'string') {
      throw new MyError(ErrorReasons.invalidLicenseOptions);
    } else if (typeof opts.projectName !== 'string') {
      throw new MyError(ErrorReasons.invalidProjectNameOptions);
    } else if (
      typeof opts.type !== 'string' ||
      (opts.type !== 'ts-cli' && opts.type !== 'ts-next')
    ) {
      throw new MyError(ErrorReasons.invalidTypeOptions);
    } else {
      return {
        author: opts.author,
        description: opts.description,
        license: opts.license,
        projectName: opts.projectName,
        type: opts.type,
      } as const;
    }
  };

  /**
   * TODO: cmd.optsをパースした結果がデフォルト値かどうかで判定したほうが筋が良い
   * @param processArgvLength process.argv.length、最低2が入る
   * @param optionParamLength commanderのoptsの長さ
   * @returns
   */
  export const hasCommandLineOptions = (
    processArgvLength: number,
    optionParamLength: number
  ) => {
    return processArgvLength - 2 + optionParamLength > 0;
  };

  export const shouldTerminate = (code: string) => {
    return code === 'commander.helpDisplayed' || code === 'commander.version';
  };
}
