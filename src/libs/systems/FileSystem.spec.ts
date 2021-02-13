import { existsSync, mkdirSync, rmdirSync } from 'fs';
import path from 'path';
import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';
import * as FileSystem from './FileSystem';

describe('getdistPath', () => {
  it('function can work', () => {
    expect(FileSystem.getCwdPath()).toBe(process.cwd());
  });
});

describe('availableDestination', () => {
  it('available', () => {
    expect(FileSystem.availableDestination('/home/foo')).toBe(true);
  });
  it('unavailable', () => {
    expect(FileSystem.availableDestination('/home')).toBe(false);
  });
});

describe('renameDirectory', () => {
  const oldPath = path.join(process.cwd(), 'old');
  const newPath = path.join(process.cwd(), 'new');

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
    FileSystem.renameDirectory(oldPath, newPath);
    expect(spyRenameDirectory).toReturn();
  });

  it('new dir exists', () => {
    mkdirSync(newPath);
    try {
      FileSystem.renameDirectory(oldPath, newPath);
    } catch (error) {
      expect((error as TsgException).reason).toEqual(ErrorReasons.mvCmdFail);
    }
  });

  it('old, new dir not exists', () => {
    try {
      FileSystem.renameDirectory(oldPath, newPath);
    } catch (error) {
      expect((error as TsgException).reason).toEqual(ErrorReasons.mvCmdFail);
    }
  });
});
