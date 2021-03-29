import { execSync } from 'child_process';
import { installNpmModules } from '../ProjectCreator';
import { getNpmMajorVersion, isNpmVersion7OrLater } from '../systems/Npm';

jest.mock('child_process');
const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

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
