import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { MyFile } from '.';
import { MyError } from '../../util/MyError';

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
    assert.strictEqual(MyFile.getCwdPath(), process.cwd());
  });
});

describe('availableDestination', () => {
  it('パスが存在しないときに例外がスローされないこと', () => {
    const destPath = getPath('/foo');
    assert.doesNotThrow(() => {
      MyFile.availableDestination(destPath);
    });
  });
  it('パスが存在しないときに例外がスローされること', () => {
    assert.throws(() => {
      MyFile.availableDestination(basePath);
    }, MyError);
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
    assert.strictEqual(actual, undefined);
  });

  it('リネーム先ディレクトリがある場合に例外がスローされること', () => {
    mkdirSync(destPath);
    assert.throws(() => {
      MyFile.renameDir(repoUrl, 'new');
    }, MyError);
  });

  it('リネーム元ディレクトリがない場合に例外がスローされること', () => {
    assert.throws(() => {
      MyFile.renameDir(repoUrl, 'new');
    }, MyError);
  });
});

describe('getRepoNameFromUrl', () => {
  it('リポジトリURLからリポジトリ名が取得できること', () => {
    const gotPath = MyFile.getRepoNameFromUrl(
      'https://github.com/Lycolia/ts-server-boilerplate.git'
    );
    assert.strictEqual(gotPath, 'ts-server-boilerplate');
  });
});

describe('getDirNameFromProjectName', () => {
  it('@始まりで@があるセグメントを含まないスラッシュ以降の文字列が取得できること', () => {
    const gotName = MyFile.getDirNameFromProjectName(
      '@unknown/no-name-project'
    );
    assert.strictEqual(gotName, 'no-name-project');
  });

  it('@始まりでなく複数スラッシュがある場合に最後のスラッシュ以降の文字列が取得できること', () => {
    const gotName = MyFile.getDirNameFromProjectName(
      'slash/slash/no-name-project'
    );
    assert.strictEqual(gotName, 'slash/slash/no-name-project');
  });

  it('複数スラッシュがあるときに@始まりで@があるセグメントを含まないスラッシュ以降の文字列が取得できること', () => {
    const gotName = MyFile.getDirNameFromProjectName(
      '@unknown/slash/no-name-project'
    );
    assert.strictEqual(gotName, 'slash/no-name-project');
  });
});
