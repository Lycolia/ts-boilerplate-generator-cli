import fs from 'fs';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

export namespace MyFile {
  /**
   * @throws CWDがなかったりすると例外がスローされる
   */
  export const getCwdPath = () => {
    try {
      return process.cwd();
    } catch (error) {
      throw new MyError(ErrorReasons.cdNotExists, error);
    }
  };

  /**
   * @throws パスが有効でなければ例外がスローされる
   */
  export const availableDestination = (destPath: string) => {
    if (fs.existsSync(destPath)) {
      throw new MyError(ErrorReasons.existsDestPath, undefined);
    }
  };

  /**
   * @throws リネームに失敗したら例外がスローされる
   */
  export const renameDir = (repoUrl: string, createDestDir: string) => {
    // TODO: 責務ではないので外に出すか、関数の名前をわかりやすく変えたほうが良い気がする？
    const fromPath = getRepoNameFromUrl(repoUrl);
    try {
      fs.renameSync(fromPath, createDestDir);
    } catch (error) {
      throw new MyError(ErrorReasons.mvCmdFail, error);
    }
  };

  export const getRepoNameFromUrl = (repoUrl: string) => {
    return repoUrl.replace(/^.+\/(.+?)\.git$/, '$1');
  };

  export const getDirNameFromProjectName = (projectName: string) => {
    return projectName.replace(/^@.+?\//, '');
  };
}
