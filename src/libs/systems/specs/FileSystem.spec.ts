import { existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { AppError, ErrorReasons } from '../../../models/ExitReasons';
import * as FileSystem from '../FileSystem';

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

describe('getdistPath', () => {
  it('function can work', () => {
    expect(FileSystem.getCwdPath()).toBe(process.cwd());
  });
});

describe('availableDestination', () => {
  it('available (dont exists)', () => {
    const destPath = getPath('/foo');
    expect(FileSystem.availableDestination(destPath)).toBe(true);
  });
  it('unavailable (exists)', () => {
    expect(FileSystem.availableDestination(basePath)).toBe(false);
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

  // spyon
  const spyRenameDirectory = jest.spyOn(FileSystem, 'renameDirectory');

  it('old dir exists', () => {
    mkdirSync(oldPath);
    FileSystem.renameDirectory(repoUrl, 'new');
    expect(spyRenameDirectory).toReturn();
  });

  it('new dir exists', () => {
    mkdirSync(newPath);
    try {
      FileSystem.renameDirectory(repoUrl, 'new');
    } catch (error) {
      expect((error as AppError).reason).toEqual(ErrorReasons.mvCmdFail);
    }
  });

  it('old, new dir not exists', () => {
    try {
      FileSystem.renameDirectory(repoUrl, 'new');
    } catch (error) {
      expect((error as AppError).reason).toEqual(ErrorReasons.mvCmdFail);
    }
  });
});

describe('getPathFromClonedProject', () => {
  it('get path', () => {
    const gotPath = FileSystem.getRepositoryNameFromUrl(
      'https://github.com/Lycolia/ts-server-boilerplate.git'
    );
    expect(gotPath).toBe('ts-server-boilerplate');
  });
});

describe('getDirNameFromProjectName', () => {
  it('get name by namespased name', () => {
    const gotName = FileSystem.getDirNameFromProjectName(
      '@unknown/no-name-project'
    );
    expect(gotName).toBe('no-name-project');
  });

  it('get name by slashed name', () => {
    const gotName = FileSystem.getDirNameFromProjectName(
      'slash/slash/no-name-project'
    );
    expect(gotName).toBe('slash/slash/no-name-project');
  });

  it('get name by combined namespased and slashed name', () => {
    const gotName = FileSystem.getDirNameFromProjectName(
      '@unknown/slash/no-name-project'
    );
    expect(gotName).toBe('slash/no-name-project');
  });
});
