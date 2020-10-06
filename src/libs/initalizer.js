// @ts-check

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { exitCode } = require('./exitCodes');
const { infoLog, errorLog } = require('./log');
const { propmtConfigureDialog } = require('./dialog');
const { getProjectName } = require('./argument');

/**
 * Initalize app and Get project meta
 *
 * @returns {Promise<{ destPath: string, name: string, description: string, author: string, license: string }>}
 */
exports.getProjectConfig = async () => {
  infoLog('Initalizing...');

  const meta = await getProjectMeta();
  const destPath = getDestPath(getExecPath(), meta);
  cloneBoilerplate(destPath);
  infoLog('Initalized!!');

  return {
    destPath: destPath,
    ...meta,
  };
};

/**
 * Get command execute path,
 * Exit process when exception throws
 * @returns {string} execute path
 */
function getExecPath() {
  try {
    return process.cwd();
  } catch (e) {
    errorLog(exitCode.cdNotExists.subject);
    errorLog(exitCode.cdNotExists.message);
    process.exit(exitCode.cdNotExists.code);
  }
}

/**
 * Get project meta
 * @returns {Promise<{ name: string, description: string, author: string, license: string }>}
 */
async function getProjectMeta() {
  const projectName = getProjectName();
  if (projectName) {
    return {
      name: projectName,
      description: projectName,
      author: '',
      license: 'Unlicense',
    };
  } else {
    return await propmtConfigureDialog();
  }
}

/**
 * Get valid destination path and Set project name from execute arguments,
 * Exit process when invalid path
 * @param {string} execPath
 * @param {{ name: string, description: string, author: string, license: string }} projectMeta
 */
function getDestPath(execPath, projectMeta) {
  const distPath = path.join(execPath, projectMeta.name);
  if (canAllocPath(distPath)) {
    // can alloc path
    return distPath;
  } else {
    errorLog(exitCode.existsDistPath.subject);
    errorLog(exitCode.existsDistPath.message);
    process.exit(exitCode.existsDistPath.code);
  }
}

/**
 * Validate allocating path
 * @param {string} path allocating path
 */
function canAllocPath(path) {
  if (fs.existsSync(path)) {
    // disallow if path exists
    return false;
  } else {
    // allow if path not exists
    return true;
  }
}

/**
 * Clone boilerplate from github,
 * Exit process when exception throws
 */
function cloneBoilerplate(destPath) {
  try {
    infoLog('Checkouting Project files...');
    execSync(
      `git clone https://github.com/Lycolia/ts-server-boilerplate.git ${destPath}`,
      {
        stdio: 'ignore',
      }
    );
    infoLog('Checkouted Project files!');
  } catch (e) {
    errorLog(exitCode.failPull.subject);
    process.exit(exitCode.failPull.code);
  }
}
