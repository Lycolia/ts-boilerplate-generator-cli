import { execSync } from 'child_process';
import { getNpmMajorVersion, isNpmVersion7OrLater } from '../Npm';

describe('getNpmMajorVersion', () => {
  it('get number of head', () => {
    const ver = getNpmMajorVersion();
    const rawVer = Number(execSync('npm -v').toString().split('.')[0]);
    expect(ver).toBe(rawVer);
  });
});

describe('isNpmVersion7OrLater', () => {
  it('7 or later', () => {
    expect(isNpmVersion7OrLater(7)).toBe(true);
  });
  it('6 or before', () => {
    expect(isNpmVersion7OrLater(6)).toBe(false);
  });
});
