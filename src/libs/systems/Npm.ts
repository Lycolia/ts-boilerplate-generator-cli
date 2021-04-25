import { execSync } from 'child_process';
import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';
import { infoLog } from '../Log';

/**
 * install npm modules
 * @param projectDest
 * @throws {TsgException}
 */
export const installNpmModules = (projectDest: string) => {
  try {
    infoLog('Installing npm modules...');
    execSync(`cd ${projectDest} && npm ci`, {
      stdio: 'ignore',
    });
  } catch (error) {
    throw new TsgException(ErrorReasons.failNpmInst, error);
  }
};
