import { execSync } from 'child_process';
import { ErrorReasons, createError } from '../../models/ErrorReasons';
import { infoLog } from '../Log';

/**
 * install npm modules
 * @param projectDest
 * @throws {AppError}
 */
export const installNpmModules = (projectDest: string) => {
  try {
    infoLog('Installing npm modules...');
    execSync(`cd ${projectDest} && npm ci && npx prettier -w package.json`, {
      stdio: 'ignore',
    });
  } catch (error) {
    throw createError(ErrorReasons.failNpmInst, error);
  }
};