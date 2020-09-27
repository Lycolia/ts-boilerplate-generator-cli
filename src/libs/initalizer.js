// @ts-check

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const { exitCode } = require('./exitCodes');
const { infoLog, errorLog } = require('./log');

/**
 * This result
 */
let result = {
  destinationPath: '',
  projectName: '',
};

/**
 * Initalize app and Get project meta
 *
 * @returns initalize result
 */
exports.getProjectMeta = () => {
  infoLog(chalk.green('Initalizing...'));
  const execPath = getExecPath();
  setDestPath(execPath);
  pullBoilerplate();
  infoLog(chalk.green('Initalized!!'));

  return result;
}

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
 * Set valid destination path and Set project name from execute arguments,
 * Exit process when invalid path
 */
function setDestPath(execPath) {
  if (process.argv.length === 3) {
    const argPath = process.argv[2].trimEnd();
    result.projectName = argPath;
    const distPath = path.join(execPath, argPath);
    if (argPath && canAllocPath(distPath)) {
      // not empty argument and can alloc path
      result.destinationPath = distPath;
    } else if (!argPath) {
      // empty path
      errorLog(exitCode.invalidArg.subject);
      errorLog(exitCode.invalidArg.message);
      process.exit(exitCode.invalidArg.code);
    } else {
      errorLog(exitCode.existsDistPath.subject);
      errorLog(exitCode.existsDistPath.message);
      process.exit(exitCode.existsDistPath.code);
    }
  } else {
    errorLog(exitCode.invalidArg.subject);
    errorLog(exitCode.invalidArg.message);
    process.exit(exitCode.invalidArg.code);
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
 * Pull boilerplate from github,
 * Exit process when exception throws
 */
function pullBoilerplate() {
  try {
    execSync(
      `git clone https://github.com/Lycolia/ts-server-boilerplate.git ${result.destinationPath} > /dev/null`,
      {
        stdio: 'ignore',
      }
    );
    infoLog(chalk.green('Pulled Project files'));
  } catch (e) {
    errorLog(exitCode.failPull.subject);
    process.exit(exitCode.failPull.code);
  }
}
