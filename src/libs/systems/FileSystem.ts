import fs from 'fs';
import { ErrorReasons, reportError } from '../../models/ErrorReasons';

/**
 * get current working directory path,
 * @throws {AppError}
 */
export const getCwdPath = () => {
  try {
    return process.cwd();
  } catch {
    throw reportError(ErrorReasons.cdNotExists);
  }
};

/**
 * available create project of destination
 * @param distPath create destination path
 */
export const availableDestination = (distPath: string) => {
  return !fs.existsSync(distPath);
};

/**
 * rename directory from repository url to project directory
 * @param repositoryUrl from repository url
 * @param createDestDir create destination directory name
 * @throws {AppError}
 */
export const renameDirectory = (
  repositoryUrl: string,
  createDestDir: string
) => {
  const fromPath = getRepositoryNameFromUrl(repositoryUrl);
  try {
    fs.renameSync(fromPath, createDestDir);
  } catch (error) {
    throw reportError(ErrorReasons.mvCmdFail, error);
  }
};

/**
 * get repository name from repository url
 * @param repositoryUrl
 */
export const getRepositoryNameFromUrl = (repositoryUrl: string) => {
  return repositoryUrl.replace(/^.+\/(.+?)\.git$/, '$1');
};

/**
 * rename directory source to
 * @param projectName
 */
export const getDirNameFromProjectName = (projectName: string) => {
  return projectName.replace(/^@.+?\//, '');
};
