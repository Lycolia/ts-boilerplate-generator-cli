import { execSync } from 'child_process';
import {
  getNpmMajorVersion,
  installNpmModules,
  isNpmVersion7OrLater,
} from '../Npm';

jest.mock('child_process');
const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

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

describe('installNpmModules', () => {
  mockExecSync.mockImplementation((command: string) => Buffer.from(command));

  it('check npm version', () => {
    const npmVer = getNpmMajorVersion();
    installNpmModules('test');
    expect(mockExecSync).toHaveBeenCalled();
    if (isNpmVersion7OrLater(npmVer)) {
      expect(mockExecSync).toHaveBeenNthCalledWith(
        3,
        'cd test && npm ci --legacy-peer-deps',
        {
          stdio: 'ignore',
        }
      );
    } else {
      expect(mockExecSync).toHaveBeenNthCalledWith(3, 'cd test && npm ci', {
        stdio: 'ignore',
      });
    }
  });
});
