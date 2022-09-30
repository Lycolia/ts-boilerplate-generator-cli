import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import path from 'path';
import { ErrorReasons, createError } from 'src/models/ErrorReasons';
import { ProjectOption } from 'src/models/ProjectOptions';
import { Repositories } from 'src/models/Repositories';
import { infoLog } from '../Log';
import {
  availableDestination,
  getCwdPath,
  getDirNameFromProjectName,
  renameDirectory,
} from 'src/libs/systems/File';
import * as git from 'src/libs/systems/Git';
import { installNpmModules } from 'src/libs/systems/Npm';
import { replacePackageJson } from 'src/libs/systems/PackageJsonReplacer';

/**
 * create project
 * @param projectOpt
 * @throws {AppError}
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
 * @throws {AppError}
 */
export const getDestDirWithValidate = (projectName: string) => {
  infoLog('Checking enviroments...');

  // git validations
  git.validateInstalled();
  if (!git.canCommiting()) {
    throw createError(ErrorReasons.gitNotConfigure);
  }

  // fs validations
  const cwdPath = getCwdPath();
  const dirName = getDirNameFromProjectName(projectName);
  const fullPath = path.join(cwdPath, dirName);

  if (!availableDestination(fullPath)) {
    throw createError(ErrorReasons.existsDistPath);
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