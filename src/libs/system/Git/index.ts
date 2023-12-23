import { execSync } from 'child_process';
import { MyError } from '../../util/MyError';
import { MyLog } from '../../util/MyLog';
import { ErrorReasons } from '../../../models/ErrorReasons';

export namespace Git {
  export const hasInstalled = () => {
    try {
      execSync('git --help');
    } catch (error) {
      return new MyError(ErrorReasons.gitNotFound, error);
    }
  };

  export const canCommit = () => {
    try {
      const configs = execSync('git config --list').toString();

      if (
        (configs.match(/user\.name=.+/) !== null) === false ||
        (configs.match(/user\.email=.+/) !== null) === false
      ) {
        return new MyError(ErrorReasons.gitNotConfigure, undefined);
      }
    } catch (error) {
      return new MyError(ErrorReasons.unmanagedException, error);
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
      return new MyError(ErrorReasons.failPull, error);
    }
  };

  export const init = (projectDest: string) => {
    MyLog.info('Initialize Git...');
    execSync(`git -C ${projectDest} init`);
    execSync(`git -C ${projectDest} add -A`);
    execSync(`git -C ${projectDest} commit -m "inital commit"`);
  };
}
