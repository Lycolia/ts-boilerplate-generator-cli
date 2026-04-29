import child_process from 'node:child_process';
import { Npm } from '.';

const mockedExecSync = jest
  .spyOn(child_process, 'execSync')
  .mockImplementation();

describe('install', () => {
  it('check npm version', () => {
    Npm.install('test');

    expect(mockedExecSync).toHaveBeenCalledWith(
      'cd test && git init && npm ci && npx -y prettier -w package.json',
      {
        stdio: 'ignore'
      }
    );
  });
});
