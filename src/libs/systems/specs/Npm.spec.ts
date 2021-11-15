import { execSync } from 'child_process';
import { installNpmModules } from '../Npm';

jest.mock('child_process');
const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe('installNpmModules', () => {
  mockExecSync.mockImplementation((command: string) => Buffer.from(command));

  it('check npm version', () => {
    installNpmModules('test');
    expect(mockExecSync).toHaveBeenCalledWith(
      'cd test && npm ci && npx prettier -w package.json',
      {
        stdio: 'ignore',
      }
    );
  });
});
