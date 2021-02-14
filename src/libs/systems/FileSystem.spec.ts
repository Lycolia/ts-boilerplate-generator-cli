import { existsSync, mkdirSync, rmdirSync } from 'fs';
import path from 'path';
import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';
import * as FileSystem from './FileSystem';

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
  const oldPath = getPath('old');
  const newPath = getPath('new');

  afterEach(() => {
    if (existsSync(oldPath)) {
      rmdirSync(oldPath);
    }
    if (existsSync(newPath)) {
      rmdirSync(newPath);
    }
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  // spyon
  const spyRenameDirectory = jest.spyOn(FileSystem, 'renameDirectory');

  it('old dir exists', () => {
    mkdirSync(oldPath);
    FileSystem.renameDirectory(oldPath, 'new');
    expect(spyRenameDirectory).toReturn();
  });

  it('new dir exists', () => {
    mkdirSync(newPath);
    try {
      FileSystem.renameDirectory(oldPath, 'new');
    } catch (error) {
      expect((error as TsgException).reason).toEqual(ErrorReasons.mvCmdFail);
    }
  });

  it('old, new dir not exists', () => {
    try {
      FileSystem.renameDirectory(oldPath, 'new');
    } catch (error) {
      expect((error as TsgException).reason).toEqual(ErrorReasons.mvCmdFail);
    }
  });
});
