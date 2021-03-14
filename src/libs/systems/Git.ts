import { execSync } from 'child_process';
import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';
import { infoLog } from '../Log';

/**
 * validate installed git
 *
 * @throws {TsgException} if not installed then exit program
 */
export const validateInstalled = () => {
  try {
    execSync('git --help');
  } catch (error) {
    throw new TsgException(ErrorReasons.gitNotFound, error);
  }
};

/**
 * can exec git commit
 *
 * @throws {TsgException} if occured exception then exit program
 */
export const canCommiting = () => {
  try {
    const configs = execSync('git config --list').toString();
    return (
      (configs.match(/user\.name=.+/) !== null) === true &&
      (configs.match(/user\.email=.+/) !== null) === true
    );
  } catch (error) {
    throw new TsgException(ErrorReasons.unmanagedException, error);
  }
};

/**
 * git clone
 * @throws {TsgException} if failed pull then exit program
 *
 * @param repositoryUrl git clone url
 */
export const clone = (repositoryUrl: string) => {
  try {
    infoLog('Cloning Project...');
    execSync(`git clone ${repositoryUrl}`, {
      stdio: 'ignore',
    });
  } catch (error) {
    throw new TsgException(ErrorReasons.failPull, error);
  }
};

/**
 * git init and inital commit
 * @param projectDest
 */
export const init = (projectDest: string) => {
  infoLog('Initialize Git...');
  execSync(`git -C ${projectDest} init`);
  execSync(`git -C ${projectDest} add -A`);
  execSync(`git -C ${projectDest} commit -m "inital commit"`);
};
