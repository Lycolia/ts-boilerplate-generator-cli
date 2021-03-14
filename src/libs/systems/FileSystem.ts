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
  return !fs.existsSync(distPath);
};

/**
 * rename directory from repository url to project directory
 * @param repositoryUrl
 * @param projectDirectoryName
 * @throws {TsgException}
 */
export const renameDirectory = (
  repositoryUrl: string,
  projectDirectoryName: string
) => {
  const fromPath = getPathFromClonedProject(repositoryUrl);
  const toName = getDirNameFromProjectName(projectDirectoryName);
  try {
    fs.renameSync(fromPath, toName);
  } catch (error) {
    throw new TsgException(ErrorReasons.mvCmdFail, error);
  }
};

/**
 * rename directory source from
 * @param repositoryUrl
 */
export const getPathFromClonedProject = (repositoryUrl: string) => {
  return repositoryUrl.replace(/^.+\/(.+?)\.git$/, '$1');
};

/**
 * rename directory source to
 * @param projectName
 */
export const getDirNameFromProjectName = (projectName: string) => {
  return projectName.replace(/^@.+?\//, '').replace(/\//g, '-');
};
