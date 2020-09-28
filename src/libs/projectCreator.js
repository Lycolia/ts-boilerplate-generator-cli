// @ts-check

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { exitCode } = require('./exitCodes');
const { infoLog, errorLog } = require('./log');
const { getReadme } = require('./readmeGenerator');

/**
 * Init result
 */
let init = {
  destinationPath: '',
  projectName: '',
};

/**
 * Create project,
 * Exit process when exception throws
 * @params {array} initResult
 */
exports.createProject = (initResult) => {
  init = initResult;
  infoLog('Creating...');
  try {
    updatePackageJson();
    removeJunks();
    initGitRepo();
  } catch (e) {
    errorLog(exitCode.failCreatePj.subject);
    errorLog(e);
    process.exit(exitCode.failCreatePj.code);
  }
  infoLog('Created project:', init.destinationPath);
};

/**
 * Update package.json
 */
function updatePackageJson() {
  const pkgJsonPath = path.join(init.destinationPath, './package.json');
  const packageJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  packageJson.name = init.projectName;
  packageJson.description = init.projectName;
  packageJson.author = '';
  packageJson.license = '';
  packageJson.repository.type = '';
  packageJson.repository.url = '';
  fs.writeFileSync(pkgJsonPath, JSON.stringify(packageJson, null, '  '));
  infoLog('Write project meta in package.json');
}

/**
 * Remove junk files and Clean README
 */
function removeJunks() {
  const licensePath = path.join(init.destinationPath, './LICENSE');
  fs.unlinkSync(licensePath);

  const pkglockPath = path.join(init.destinationPath, './package-lock.json');
  fs.unlinkSync(pkglockPath);

  const gitPath = path.join(init.destinationPath, './.git');
  fs.rmdirSync(gitPath, { recursive: true });

  const readmePath = path.join(init.destinationPath, './README.md');
  fs.writeFileSync(readmePath, getReadme(init.projectName));
  infoLog('Remove junks');
}

/**
 * Initalize git repo
 */
function initGitRepo() {
  execSync(`git init ${init.destinationPath}`);
  execSync(`git -C ${init.destinationPath} add -A`);
  execSync(`git -C ${init.destinationPath} commit -m "inital commit"`);
  infoLog('Initalized git repository');
}
