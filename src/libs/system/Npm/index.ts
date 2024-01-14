import { execSync } from 'node:child_process';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

export namespace Npm {
  export const install = (projectDest: string) => {
    try {
      execSync(`cd ${projectDest} && npm ci && npx prettier -w package.json`, {
        stdio: 'ignore',
      });
    } catch (error) {
      throw new MyError(ErrorReasons.failNpmInst, error);
    }
  };
}
