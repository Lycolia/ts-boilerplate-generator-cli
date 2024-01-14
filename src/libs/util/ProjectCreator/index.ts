import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import path from 'path';
import { ProjectOption } from '../../../models/ProjectOptions';
import { Repositories } from '../../../models/Repositories';
import { Git } from '../../system/Git';
import { MyLog } from '../MyLog';
import { MyFile } from '../../system/MyFile';
import { PackageJsonReplacer } from '../../system/PackageJsonReplacer';
import { Npm } from '../../system/Npm';

export namespace ProjectCreator {
  /**
   * @throws なんかのエラー
   */
  export const createProject = (projectOpt: ProjectOption) => {
    MyLog.info('Checking enviroments...');
    const dest = getDestDirWithValidate(projectOpt.projectName);
    MyLog.info('Cloning Project...');
    const repoUrl = Repositories[projectOpt.type];
    Git.clone(repoUrl);
    MyLog.info('Parsing project options...');
    MyFile.renameDir(repoUrl, dest.dirName);

    cleanup(dest.fullPath);
    updateReadMe(projectOpt, dest.fullPath);
    updatePackageJson(projectOpt, dest.fullPath);

    MyLog.info('Installing npm modules...');
    Npm.install(dest.fullPath);
    Git.init(dest.fullPath);

    MyLog.info('Project created!!');
    MyLog.info(`Starting project begin by typing: cd ${dest.dirName}`);
  };

  /**
   * @throws なんかのエラー
   */
  export const getDestDirWithValidate = (projectName: string) => {
    Git.hasInstalled();
    Git.validateCommit();
    const dirName = MyFile.getDirNameFromProjectName(projectName);
    const cwdPath = MyFile.getCwdPath();
    const fullPath = path.join(cwdPath, dirName);
    MyFile.availableDestination(fullPath);

    return {
      fullPath,
      dirName,
    };
  };

  /**
   * @throws なんかのエラー
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
   * @throws なんかのエラー
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
   * @throws なんかのエラー
   */
  export const updatePackageJson = (
    projectOpt: ProjectOption,
    projectDest: string
  ) => {
    const pkgJsonPath = path.join(projectDest, './package.json');
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath).toString());
    const replaced = JSON.stringify(
      PackageJsonReplacer.replace(pkgJson, projectOpt)
    );
    writeFileSync(pkgJsonPath, replaced);
  };
}
