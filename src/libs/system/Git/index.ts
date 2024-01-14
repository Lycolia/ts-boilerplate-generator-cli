import { execSync } from 'child_process';
import { MyError } from '../../util/MyError';
import { MyLog } from '../../util/MyLog';
import { ErrorReasons } from '../../../models/ErrorReasons';

export namespace Git {
  /**
   * @throws なんかのエラー
   */
  export const hasInstalled = () => {
    try {
      execSync('git --help');
    } catch (error) {
      throw new MyError(ErrorReasons.gitNotFound, error);
    }
  };

  /**
   * @throws なんかのエラー
   */
  export const validateCommit = () => {
    const configs = execSync('git config --list').toString();

    if (
      (configs.match(/user\.name=.+/) !== null) === false ||
      (configs.match(/user\.email=.+/) !== null) === false
    ) {
      throw new MyError(ErrorReasons.gitNotConfigure, undefined);
    }
  };

  /**
   * @param cloneUrl git clone url
   * @throws なんかのエラー
   */
  export const clone = (cloneUrl: string) => {
    try {
      execSync(`git clone ${cloneUrl}`, {
        stdio: 'ignore',
      });
    } catch (error) {
      throw new MyError(ErrorReasons.failPull, error);
    }
  };

  /**
   * @throws なんかのエラー
   */
  export const init = (projectDest: string) => {
    MyLog.info('Initialize Git...');
    execSync(`git -C ${projectDest} init`);
    execSync(`git -C ${projectDest} add -A`);
    execSync(`git -C ${projectDest} commit -m "inital commit"`);
  };
}
