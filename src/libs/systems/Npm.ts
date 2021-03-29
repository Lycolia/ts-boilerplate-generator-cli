import { execSync } from 'child_process';
import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';
import { infoLog } from '../Log';

/**
 * get npm major version
 * @returns x in x.y.z
 */
export const getNpmMajorVersion = () => {
  return Number(execSync('npm -v').toString().split('.')[0]);
};

/**
 *
 * @param npmVer
 * @returns
 */
export const isNpmVersion7OrLater = (npmVer: number) => {
  return npmVer >= 7;
};

/**
 * install npm modules
 * @param projectDest
 * @throws {TsgException}
 */
export const installNpmModules = (projectDest: string) => {
  try {
    infoLog('Installing npm modules...');
    const npmVer = getNpmMajorVersion();
    if (isNpmVersion7OrLater(npmVer)) {
      execSync(`cd ${projectDest} && npm ci --legacy-peer-deps`, {
        stdio: 'ignore',
      });
    } else {
      execSync(`cd ${projectDest} && npm ci`, {
        stdio: 'ignore',
      });
    }
  } catch (error) {
    throw new TsgException(ErrorReasons.failNpmInst, error);
  }
};
