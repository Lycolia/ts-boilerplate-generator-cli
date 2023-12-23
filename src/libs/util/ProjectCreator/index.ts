import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import path from 'path';
import { ProjectOption } from '../../../models/ProjectOptions';
import { Repositories } from '../../../models/Repositories';
import { Git } from '../../system/Git';
import { MyError } from '../MyError';
import { MyLog } from '../MyLog';
import { MyFile } from '../../system/MyFile';

export namespace ProjectCreator {
  /**
   * create project
   * @param projectOpt
   */
  export const createProject = (projectOpt: ProjectOption) => {
    MyLog.info('Checking enviroments...');
    const dest = getDestDirWithValidate(projectOpt.projectName);
    if (dest instanceof MyError) {
      return dest;
    }

    MyLog.info('Cloning Project...');
    const repoUrl = Repositories[projectOpt.type];
    const gitError = Git.clone(repoUrl);
    if (gitError instanceof MyError) {
      return gitError;
    }

    MyLog.info('Parsing project options...');
    const renameError = MyFile.renameDir(repoUrl, dest.dirName);
    if (renameError instanceof MyError) {
      return renameError;
    }

    cleanup(dest.fullPath);
    updateReadMe(projectOpt, dest.fullPath);
    updatePackageJson(projectOpt, dest.fullPath);

    MyLog.info('Installing npm modules...');
    installModules(dest.fullPath);
    Git.init(dest.fullPath);

    MyLog.info('Project created!!');
    MyLog.info(`Starting project begin by typing: cd ${dest.dirName}`);
  };

  /**
   * enviroments validation and return new project path and directory name
   * @param projectName
   */
  export const getDestDirWithValidate = (projectName: string) => {
    const validateInstalled = Git.hasInstalled();
    if (validateInstalled instanceof Error) {
      return validateInstalled;
    }
    const canCommiting = Git.canCommit();
    if (canCommiting instanceof Error) {
      return canCommiting;
    }

    const cwdPath = MyFile.getCwdPath();
    if (cwdPath instanceof Error) {
      return cwdPath;
    }
    const dirName = File.getDirNameFromProjectName(projectName);
    const fullPath = path.join(cwdPath, dirName);
    const availabled = File.availableDestination(fullPath);
    if (availabled instanceof MyError) {
      return availabled;
    }

    return {
      fullPath,
      dirName,
    };
  };

  /**
   * cleanup unnecessary files
   *
   * @param projectDest
   */
  export const cleanup = (projectDest: string) => {
    const targets = [
      { path: './LICENSE', isDir: false },
      { path: './.git', isDir: true },
    ];

    targets.forEach((item) => {
      const itemPath = path.join(projectDest, item.path);
      if (existsSync(itemPath)) {
        if (item.isDir) {
          rmSync(itemPath, { force: true, recursive: true });
        } else {
          rmSync(itemPath);
        }
      }
    });
  };

  /**
   * update readme
   * @param projectOpt
   * @param projectDest
   */
  export const updateReadMe = (
    projectOpt: ProjectOption,
    projectDest: string
  ) => {
    const readmePath = path.join(projectDest, './README.md');
    const readme = readFileSync(readmePath).toString();
    writeFileSync(readmePath, replaceReadMe(readme, projectOpt));
  };

  /**
   * replace ProjectOption
   * @param readme
   * @param projectOpt
   */
  export const replaceReadMe = (readme: string, projectOpt: ProjectOption) => {
    return readme
      .replace('{author}', projectOpt.author)
      .replace('{description}', projectOpt.description)
      .replace('{license}', projectOpt.license)
      .replace('{projectName}', projectOpt.projectName);
  };

  /**
   * update PackageJson
   * @param projectOpt
   * @param projectDest
   */
  export const updatePackageJson = (
    projectOpt: ProjectOption,
    projectDest: string
  ) => {
    const pkgJsonPath = path.join(projectDest, './package.json');
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath).toString());
    const replaced = JSON.stringify(replacePackageJson(pkgJson, projectOpt));
    writeFileSync(pkgJsonPath, replaced);
  };
}
