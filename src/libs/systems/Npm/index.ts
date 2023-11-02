import { execSync } from 'child_process';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../core/MyError';

/**
 * install npm modules
 * @param projectDest
 */
export const installNpmModules = (projectDest: string) => {
  try {
    execSync(`cd ${projectDest} && npm ci && npx prettier -w package.json`, {
      stdio: 'ignore',
    });
  } catch (error) {
    return MyError.create(ErrorReasons.failNpmInst, error);
  }
};
