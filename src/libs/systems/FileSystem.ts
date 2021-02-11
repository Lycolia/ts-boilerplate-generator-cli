import { execSync } from 'child_process';
import fs from 'fs';
import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';

/**
 * get current working directory path,
 * @throws TsgException
 */
export const getCwdPath = () => {
  try {
    return process.cwd();
  } catch {
    throw new TsgException(ErrorReasons.cdNotExists);
  }
};

/**
 * available create project of destination
 * @param distPath create destination path
 */
export const availableDestination = (distPath: string) => {
  return canAllocPath(distPath);
};

/**
 * is path not exists
 * @param path path
 */
export const canAllocPath = (path: string) => {
  return !fs.existsSync(path);
};

/**
 * rename directory
 * @param oldName
 * @param newName
 */
export const renameDirectory = (oldName: string, newName: string) => {
  try {
    if (process.platform === 'linux') {
      execSync(`mv ${oldName}/ ${newName}/`);
    } else if (process.platform === 'win32') {
      execSync(`REN ${oldName} ${newName}`);
    }
  } catch (e) {
    throw new TsgException(ErrorReasons.unmanagedException, e);
  }
};
