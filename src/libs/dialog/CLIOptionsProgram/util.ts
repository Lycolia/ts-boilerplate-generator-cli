import { OptionValues } from 'commander';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

export namespace CLIOptionsProgramUtil {
  export const parseOpts = (opts: OptionValues) => {
    if (typeof opts.author !== 'string') {
      return new MyError(ErrorReasons.invalidAuthorOptions);
    } else if (typeof opts.description !== 'string') {
      return new MyError(ErrorReasons.invalidDescriptionOptions);
    } else if (typeof opts.license !== 'string') {
      return new MyError(ErrorReasons.invalidLicenseOptions);
    } else if (typeof opts.projectName !== 'string') {
      return new MyError(ErrorReasons.invalidProjectNameOptions);
    } else if (
      typeof opts.type !== 'string' ||
      (opts.type !== 'ts-cli' && opts.type !== 'ts-next')
    ) {
      return new MyError(ErrorReasons.invalidTypeOptions);
    } else {
      return {
        author: opts.author,
        description: opts.description,
        license: opts.license,
        projectName: opts.projectName,
        type: opts.type,
      };
    }
  };

  export const isInteractive = (commandArgsLength: number) => {
    return process.argv.length - 2 - commandArgsLength === 0;
  };
}
