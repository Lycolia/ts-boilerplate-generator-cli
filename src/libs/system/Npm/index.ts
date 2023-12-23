import { execSync } from 'child_process';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

export namespace Npm {
  /**
   * install npm modules
   * @param projectDest
   */
  export const installModules = (projectDest: string) => {
    try {
      execSync(`cd ${projectDest} && npm ci && npx prettier -w package.json`, {
        stdio: 'ignore',
      });
    } catch (error) {
      return new MyError(ErrorReasons.failNpmInst, error);
    }
  };
}
