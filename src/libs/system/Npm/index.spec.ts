import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import child_process from 'node:child_process';
import { Npm } from '.';

const mockedExecSync = mock.method(child_process, 'execSync', () => {});

describe('install', () => {
  it('check npm version', () => {
    Npm.install('test');

    assert.deepStrictEqual(mockedExecSync.mock.calls[0].arguments, [
      'cd test && npm ci && npx prettier -w package.json',
      {
        stdio: 'ignore',
      },
    ]);
  });
});
