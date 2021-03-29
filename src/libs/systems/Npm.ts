import { execSync } from 'child_process';

/**
 * get npm major version
 * @returns x in x.y.z
 */
export const getNpmMajorVersion = () => {
  return Number(execSync('npm -v').toString().split('.')[0]);
};

/**
 *
 * @param npmVer
 * @returns
 */
export const isNpmVersion7OrLater = (npmVer: number) => {
  return npmVer >= 7;
};
