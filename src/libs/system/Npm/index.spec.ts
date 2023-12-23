import { execSync } from 'child_process';
import { installModules } from '.';

jest.mock('child_process');
const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe('installModules', () => {
  mockExecSync.mockImplementation((command: string) => Buffer.from(command));

  it('check npm version', () => {
    installModules('test');
    expect(mockExecSync).toHaveBeenCalledWith(
      'cd test && npm ci && npx prettier -w package.json',
      {
        stdio: 'ignore',
      }
    );
  });
});
