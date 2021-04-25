import { execSync } from 'child_process';
import {
  existsSync,
  readFileSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import path from 'path';
import { ErrorReasons } from '../models/ExitReasons';
import { ProjectOption } from '../models/ProjectOptions';
import { Repositories } from '../models/Repositories';
import { TsgException } from '../models/TsgException';
import { infoLog } from './Log';
import {
  availableDestination,
  getCwdPath,
  getDirNameFromProjectName,
  renameDirectory,
} from './systems/FileSystem';
import * as git from './systems/Git';
import { installNpmModules } from './systems/Npm';

/**
 * create project
 * @param projectOpt
 * @throws {TsgException}
 */
export const createProject = (projectOpt: ProjectOption) => {
  const dest = getDestDirWithValidate(projectOpt.projectName);
  const repoUrl = Repositories[projectOpt.type];
  git.clone(repoUrl);
  infoLog('Parsing project options...');
  renameDirectory(repoUrl, dest.dirName);
  cleanup(dest.fullPath);
  updateReadMe(projectOpt, dest.fullPath);
  updatePackageJson(projectOpt, dest.fullPath);
  installNpmModules(dest.fullPath);
  git.init(dest.fullPath);
  infoLog('Project created!!');
  infoLog(`Starting project begin by typing: cd ${dest.dirName}`);
};

/**
 * enviroments validation and return new project path and directory name
 * @param projectName
 * @throws {TsgException}
 */
export const getDestDirWithValidate = (projectName: string) => {
  infoLog('Checking enviroments...');

  // git validations
  git.validateInstalled();
  if (!git.canCommiting()) {
    throw new TsgException(ErrorReasons.existsDistPath);
  }

  // fs validations
  const cwdPath = getCwdPath();
  const dirName = getDirNameFromProjectName(projectName);
  const fullPath = path.join(cwdPath, dirName);

  if (!availableDestination(fullPath)) {
    throw new TsgException(ErrorReasons.existsDistPath);
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

  targets.map((item) => {
    const itemPath = path.join(projectDest, item.path);
    if (existsSync(itemPath)) {
      if (item.isDir) {
        rmdirSync(itemPath, { recursive: true });
      } else {
        unlinkSync(itemPath);
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
  const pkgJson = readFileSync(pkgJsonPath).toString();
  writeFileSync(pkgJsonPath, replacePackageJson(pkgJson, projectOpt));
};

/**
 * replace ProjectOption
 * @param pkgJson
 * @param projectOpt
 */
export const replacePackageJson = (
  pkgJson: string,
  projectOpt: ProjectOption
) => {
  return pkgJson
    .replace(/"name": .+/, `"name": "${projectOpt.projectName}",`)
    .replace(/"description": .+/, `"description": "${projectOpt.description}",`)
    .replace(/"author": .+/, `"author": "${projectOpt.author}",`)
    .replace(/"license": .+/, `"license": "${projectOpt.license}",`)
    .replace(/"url": .+/, '"url": ""');
};
