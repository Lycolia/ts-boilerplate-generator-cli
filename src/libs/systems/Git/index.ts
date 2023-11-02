import { execSync } from 'child_process';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../core/MyError';
import { MyLog } from '../../core/MyLog';

export namespace Git {
  export const validateInstalled = () => {
    try {
      execSync('git --help');
    } catch (error) {
      return MyError.create(ErrorReasons.gitNotFound, error);
    }
  };

  export const validateCommiting = () => {
    try {
      const configs = execSync('git config --list').toString();

      if (
        (configs.match(/user\.name=.+/) !== null) === false ||
        (configs.match(/user\.email=.+/) !== null) === false
      ) {
        return MyError.create(ErrorReasons.gitNotConfigure);
      }
    } catch (error) {
      return MyError.create(ErrorReasons.unmanagedException, error);
    }
  };

  /**
   * @param cloneUrl git clone url
   */
  export const clone = (cloneUrl: string) => {
    try {
      execSync(`git clone ${cloneUrl}`, {
        stdio: 'ignore',
      });
    } catch (error) {
      return MyError.create(ErrorReasons.failPull, error);
    }
  };

  export const init = (projectDest: string) => {
    MyLog.info('Initialize Git...');
    execSync(`git -C ${projectDest} init`);
    execSync(`git -C ${projectDest} add -A`);
    execSync(`git -C ${projectDest} commit -m "inital commit"`);
  };
}
