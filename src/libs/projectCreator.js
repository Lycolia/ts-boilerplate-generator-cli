// @ts-check

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { exitCode } = require('./exitCodes');
const { infoLog, errorLog } = require('./log');
const { getReadme } = require('./readmeGenerator');

/**
 * Create project,
 * Exit process when exception throws
 * @param {{ destPath: string, name: string, description: string, author: string, license: string }} projectConfig
 */
exports.createProject = (projectConfig) => {
  infoLog('Creating...');
  try {
    updatePackageJson(projectConfig);
    removeJunks(projectConfig);
    installNodeModules(projectConfig);
    initGitRepo(projectConfig);
  } catch (e) {
    errorLog(exitCode.failCreatePj.subject);
    errorLog(e);
    process.exit(exitCode.failCreatePj.code);
  }
  infoLog(`Created project: ${projectConfig.destPath}`);
};

/**
 * Update package.json
 * @param {{ destPath: string, name: string, description: string, author: string, license: string }} projectConfig
 */
function updatePackageJson(projectConfig) {
  const pkgJsonPath = path.join(projectConfig.destPath, './package.json');
  const packageJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  packageJson.name = projectConfig.name;
  packageJson.version = '0.0.1';
  packageJson.description = projectConfig.description;
  packageJson.author = projectConfig.author;
  packageJson.license = projectConfig.license;
  packageJson.repository.type = '';
  packageJson.repository.url = '';
  fs.writeFileSync(pkgJsonPath, JSON.stringify(packageJson, null, '  '));
  infoLog('Write project meta in package.json');
}

/**
 * Remove junk files and Clean README
 * @param {{ destPath: string, name: string, description: string, author: string, license: string }} projectConfig
 */
function removeJunks(projectConfig) {
  const licensePath = path.join(projectConfig.destPath, './LICENSE');
  fs.unlinkSync(licensePath);

  const pkglockPath = path.join(projectConfig.destPath, './package-lock.json');
  fs.unlinkSync(pkglockPath);

  const gitPath = path.join(projectConfig.destPath, './.git');
  fs.rmdirSync(gitPath, { recursive: true });

  const readmePath = path.join(projectConfig.destPath, './README.md');
  fs.writeFileSync(
    readmePath,
    getReadme(projectConfig.name, projectConfig.description)
  );
  infoLog('Remove junks');
}

/**
 * Initalize git repo
 * @param {{ destPath: string, name: string, description: string, author: string, license: string }} projectConfig
 */
function initGitRepo(projectConfig) {
  execSync(`git init ${projectConfig.destPath}`);
  execSync(`git -C ${projectConfig.destPath} add -A`);
  execSync(`git -C ${projectConfig.destPath} commit -m "inital commit"`);
  infoLog('Initalized git repository');
}

/**
 * Install node_modules
 * @param {{ destPath: string, name: string, description: string, author: string, license: string }} projectConfig
 */
function installNodeModules(projectConfig) {
  infoLog('Installing node modules...');
  execSync(`npm i --prefix ${projectConfig.destPath}`, { stdio: 'ignore' });
  infoLog('Installed node modules!');
}
