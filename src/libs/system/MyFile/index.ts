import fs from 'fs';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

export namespace MyFile {
  export const getCwdPath = () => {
    try {
      return process.cwd();
    } catch {
      return new MyError(ErrorReasons.cdNotExists, undefined);
    }
  };

  export const availableDestination = (destPath: string) => {
    return fs.existsSync(destPath)
      ? new MyError(ErrorReasons.existsDestPath, undefined)
      : true;
  };

  export const renameDir = (repoUrl: string, createDestDir: string) => {
    const fromPath = getRepoNameFromUrl(repoUrl);
    try {
      fs.renameSync(fromPath, createDestDir);
    } catch (error) {
      return new MyError(ErrorReasons.mvCmdFail, error);
    }
  };

  /**
   * get repository name from repository url
   * @param repoUrl
   */
  export const getRepoNameFromUrl = (repoUrl: string) => {
    return repoUrl.replace(/^.+\/(.+?)\.git$/, '$1');
  };

  /**
   * rename directory source to
   * @param projectName
   */
  export const getDirNameFromProjectName = (projectName: string) => {
    return projectName.replace(/^@.+?\//, '');
  };
}
