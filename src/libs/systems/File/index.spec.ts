import { existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { MyError } from 'src/libs/core/MyError';
import { ErrorReasons } from 'src/models/ErrorReasons';
import { File } from '.';

/**
 * working base
 */
const basePath = process.cwd();
/**
 * get universal path for only testing
 * universal path is usable for linux and win32
 * @param destPath
 */
const getPath = (destPath: string) => {
  return path.join(basePath, destPath);
};

describe('getdestPath', () => {
  it('function can work', () => {
    expect(File.getCwdPath()).toBe(process.cwd());
  });
});

describe('availableDestination', () => {
  it('available (does not exists)', () => {
    const destPath = getPath('/foo');
    expect(File.availableDestination(destPath)).toBe(true);
  });
  it('unavailable (exists)', () => {
    const actual = File.availableDestination(basePath);
    if (MyError.hasError(actual)) {
      expect(actual.reason).toBe(ErrorReasons.existsDestPath);
    }
  });
});

describe('renameDirectory', () => {
  const repoUrl = 'https://github.com/Lycolia/old.git';
  const oldPath = getPath('old');
  const newPath = getPath('new');

  afterEach(() => {
    if (existsSync(oldPath)) {
      rmSync(oldPath, { force: true, recursive: true });
    }
    if (existsSync(newPath)) {
      rmSync(newPath, { force: true, recursive: true });
    }
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('old dir exists', () => {
    mkdirSync(oldPath);
    const actual = File.renameDirectory(repoUrl, 'new');
    expect(actual).toBeUndefined();
  });

  it('new dir exists', () => {
    mkdirSync(newPath);
    const actual = File.renameDirectory(repoUrl, 'new');
    if (MyError.hasError(actual)) {
      expect(actual.reason).toStrictEqual(ErrorReasons.mvCmdFail);
    }
  });

  it('old, new dir not exists', () => {
    const actual = File.renameDirectory(repoUrl, 'new');
    if (MyError.hasError(actual)) {
      expect(actual.reason).toStrictEqual(ErrorReasons.mvCmdFail);
    }
  });
});

describe('getPathFromClonedProject', () => {
  it('get path', () => {
    const gotPath = File.getRepositoryNameFromUrl(
      'https://github.com/Lycolia/ts-server-boilerplate.git'
    );
    expect(gotPath).toBe('ts-server-boilerplate');
  });
});

describe('getDirNameFromProjectName', () => {
  it('get name by namespased name', () => {
    const gotName = File.getDirNameFromProjectName('@unknown/no-name-project');
    expect(gotName).toBe('no-name-project');
  });

  it('get name by slashed name', () => {
    const gotName = File.getDirNameFromProjectName(
      'slash/slash/no-name-project'
    );
    expect(gotName).toBe('slash/slash/no-name-project');
  });

  it('get name by combined namespased and slashed name', () => {
    const gotName = File.getDirNameFromProjectName(
      '@unknown/slash/no-name-project'
    );
    expect(gotName).toBe('slash/no-name-project');
  });
});
