import { existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { MyFile } from '.';

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

describe('getCwdPath', () => {
  it('process.cwd()の値が取得できること', () => {
    expect(MyFile.getCwdPath()).toBe(process.cwd());
  });
});

describe('availableDestination', () => {
  it('パスが存在しないときに例外がスローされないこと', () => {
    const destPath = getPath('/foo');
    expect(() => {
      MyFile.availableDestination(destPath);
    }).not.toThrow();
  });
  it('パスが存在しないときに例外がスローされること', () => {
    expect(() => {
      MyFile.availableDestination(basePath);
    }).toThrow();
  });
});

describe('renameDir', () => {
  const repoUrl = 'https://github.com/Lycolia/old.git';
  const srcPath = getPath('old');
  const destPath = getPath('new');

  afterEach(() => {
    if (existsSync(srcPath)) {
      rmSync(srcPath, { force: true, recursive: true });
    }
    if (existsSync(destPath)) {
      rmSync(destPath, { force: true, recursive: true });
    }
  });

  it('リネーム元ディレクトリがある場合に正常終了すること', () => {
    mkdirSync(srcPath);
    const actual = MyFile.renameDir(repoUrl, 'new');
    expect(actual).toBeUndefined();
  });

  it('リネーム先ディレクトリがある場合に例外がスローされること', () => {
    mkdirSync(destPath);
    expect(() => {
      MyFile.renameDir(repoUrl, 'new');
    }).toThrow();
  });

  it('リネーム元ディレクトリがない場合に例外がスローされること', () => {
    expect(() => {
      MyFile.renameDir(repoUrl, 'new');
    }).toThrow();
  });
});

describe('getRepoNameFromUrl', () => {
  it('リポジトリURLからリポジトリ名が取得できること', () => {
    const gotPath = MyFile.getRepoNameFromUrl(
      'https://github.com/Lycolia/ts-server-boilerplate.git'
    );
    expect(gotPath).toBe('ts-server-boilerplate');
  });
});

describe('getDirNameFromProjectName', () => {
  it('@始まりで@があるセグメントを含まないスラッシュ以降の文字列が取得できること', () => {
    const gotName = MyFile.getDirNameFromProjectName(
      '@unknown/no-name-project'
    );
    expect(gotName).toBe('no-name-project');
  });

  it('@始まりでなく複数スラッシュがある場合に最後のスラッシュ以降の文字列が取得できること', () => {
    const gotName = MyFile.getDirNameFromProjectName(
      'slash/slash/no-name-project'
    );
    expect(gotName).toBe('slash/slash/no-name-project');
  });

  it('複数スラッシュがあるときに@始まりで@があるセグメントを含まないスラッシュ以降の文字列が取得できること', () => {
    const gotName = MyFile.getDirNameFromProjectName(
      '@unknown/slash/no-name-project'
    );
    expect(gotName).toBe('slash/no-name-project');
  });
});
