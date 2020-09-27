#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

//#region Global objects

const exitCode = {
  ok: { code: 0, subject: 'OK', message: 'OK' },
  cdNotExists: {
    code: 1,
    subject: 'Current directory may does not exist',
    message: 'Be retry in existing directory',
  },
  existsDistPath: {
    code: 2,
    subject: 'Project directory already exists',
    message: 'Please specify another project name',
  },
  invalidArg: {
    code: 3,
    subject: 'Invalid argument',
    message: 'usage: tsg [project-name]',
  },
  failPull: {
    code: 4,
    subject: 'Failure pull repository.',
    message: '',
  },
  failCreatePj: {
    code: 5,
    subject: 'Failure create project.',
    message: '',
  },
};

let projectName = '';
let destinationPath = '';

const infoLog = (message) => {
  console.info(chalk.yellow('[TS-gen]'), message);
};
const errorLog = (message) => {
  console.error(chalk.yellow('[TS-gen]'), chalk.red('[ERROR]'), message);
};

//#endregion

//#region main functions

initalize();
createProject();
infoLog(chalk.green('Created project'), destinationPath);

//#endregion

//#region Initalize

/**
 * Initalize app
 */
function initalize() {
  infoLog(chalk.green('Initalizing...'));
  const execPath = getExecPath();
  destinationPath = getDestPath(execPath);
  pullBoilerplate();
  infoLog(chalk.green('Initalized!!'));
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
 * Get valid destination path and Set project name,
 * Exit process when invalid path
 * @returns {string} destination path
 */
function getDestPath(execPath) {
  if (process.argv.length === 3) {
    const argPath = process.argv[2].trimEnd();
    projectName = argPath;
    const distPath = path.join(execPath, argPath);
    if (argPath && canAllocPath(distPath)) {
      // not empty argument and can alloc path
      return distPath;
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
      `git clone https://github.com/Lycolia/ts-server-boilerplate.git ${destinationPath} > /dev/null`,
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

//#endregion

//#region Create Project

/**
 * Create project,
 * Exit process when exception throws
 */
function createProject() {
  infoLog(chalk.green('Creating...'));
  try {
    updatePackageJson();
    removeJunks();

    // git init
    execSync(`git init ${destinationPath}`);
    infoLog(chalk.green('Create git repository!!'));
  } catch (e) {
    errorLog(exitCode.failCreatePj.subject);
    errorLog(e);
    process.exit(exitCode.failCreatePj.code);
  }
}

/**
 * Update package.json
 */
function updatePackageJson() {
  const pkgJsonPath = path.join(destinationPath, './package.json');
  const packageJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  packageJson.name = projectName;
  packageJson.description = projectName;
  packageJson.author = '';
  packageJson.license = '';
  packageJson.repository.type = '';
  packageJson.repository.url = '';
  fs.writeFileSync(pkgJsonPath, JSON.stringify(packageJson, null, '  '));
  infoLog(chalk.green('Write project meta in package.json'));
}

/**
 * Remove junk files and Clean README
 */
function removeJunks() {
  const licensePath = path.join(destinationPath, './LICENSE');
  fs.unlinkSync(licensePath);

  const gitPath = path.join(destinationPath, './.git');
  fs.rmdirSync(gitPath, { recursive: true });

  const readmePath = path.join(destinationPath, './README.md');
  const readme = `# ${projectName}\n`;
  fs.writeFileSync(readmePath, readme);
  infoLog(chalk.green('Remove junks'));
}

//#endregion
