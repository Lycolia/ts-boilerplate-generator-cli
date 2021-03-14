import * as fs from 'fs';
import path from 'path';
import { cleanup, getDestDirWithValidate } from '../ProjectCreator';
import { getTestingPlatform } from '../TestUtil';

const platform = getTestingPlatform();
const baseDir = 'test-project';

describe('getDestDirWithValidate', () => {
  const testCaseItems = {
    development() {
      const dest = getDestDirWithValidate(`@anonymous/${baseDir}`);
      expect(dest.dirName).toBe(baseDir);
      expect(dest.fullPath).toBe(path.join(process.cwd(), baseDir));
    },
    only_node() {
      expect(() => {
        getDestDirWithValidate(`@anonymous/${baseDir}`);
      }).toThrow();
    },
    node_git() {
      expect(() => {
        getDestDirWithValidate(`@anonymous/${baseDir}`);
      }).toThrow();
    },
    node_git_conf() {
      const dest = getDestDirWithValidate(`@anonymous/${baseDir}`);
      expect(dest.dirName).toBe(baseDir);
      expect(dest.fullPath).toBe(path.join(process.cwd(), baseDir));
    },
  };

  it('valid', () => {
    testCaseItems[platform]();
  });

  it('invalid', () => {
    fs.mkdirSync(baseDir);

    expect(() => {
      getDestDirWithValidate(`@anonymous/${baseDir}`);
    }).toThrow();

    fs.rmdirSync(baseDir);
  });
});

describe('cleanup', () => {
  it('function can work', () => {
    fs.mkdirSync(baseDir);
    fs.appendFileSync(`${baseDir}/LICENSE`, '-');
    fs.appendFileSync(`${baseDir}/package-lock.json`, '-');
    fs.mkdirSync(`${baseDir}/.git`);
    cleanup('test-project');

    expect(fs.existsSync(`${baseDir}/LICENSE`)).toBe(false);
    expect(fs.existsSync(`${baseDir}/package-lock.json`)).toBe(false);
    expect(fs.existsSync(`${baseDir}/.git`)).toBe(false);
    fs.rmdirSync(baseDir);
  });
});
