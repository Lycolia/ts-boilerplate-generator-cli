import fs from 'fs';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../core/MyError';

/**
 * get current working directory path,
 */
const getCwdPath = () => {
  try {
    return process.cwd();
  } catch {
    return MyError.create(ErrorReasons.cdNotExists);
  }
};

/**
 * available create project of destination
 * @param destPath create destination path
 */
const availableDestination = (destPath: string) => {
  return fs.existsSync(destPath)
    ? MyError.create(ErrorReasons.existsDestPath)
    : true;
};

/**
 * rename directory from repository url to project directory
 * @param repositoryUrl from repository url
 * @param createDestDir create destination directory name
 */
const renameDirectory = (repositoryUrl: string, createDestDir: string) => {
  const fromPath = getRepositoryNameFromUrl(repositoryUrl);
  try {
    fs.renameSync(fromPath, createDestDir);
  } catch (error) {
    return MyError.create(ErrorReasons.mvCmdFail, error);
  }
};

/**
 * get repository name from repository url
 * @param repositoryUrl
 */
const getRepositoryNameFromUrl = (repositoryUrl: string) => {
  return repositoryUrl.replace(/^.+\/(.+?)\.git$/, '$1');
};

/**
 * rename directory source to
 * @param projectName
 */
const getDirNameFromProjectName = (projectName: string) => {
  return projectName.replace(/^@.+?\//, '');
};

export const File = {
  getCwdPath,
  availableDestination,
  renameDirectory,
  getRepositoryNameFromUrl,
  getDirNameFromProjectName,
};
