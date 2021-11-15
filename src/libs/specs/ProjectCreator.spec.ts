import { existsSync, rmSync, mkdirSync, appendFileSync } from 'fs';
import path from 'path';
import { cleanup, getDestDirWithValidate } from '../ProjectCreator';
import { getTestingPlatform } from '../TestUtil';

const platform = getTestingPlatform();
const baseDir = 'test-project';

afterEach(() => {
  if (existsSync(baseDir)) {
    rmSync(baseDir);
  }
});

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
    node_git_conf_npm7() {
      const dest = getDestDirWithValidate(`@anonymous/${baseDir}`);
      expect(dest.dirName).toBe(baseDir);
      expect(dest.fullPath).toBe(path.join(process.cwd(), baseDir));
    },
  };

  it('valid', () => {
    testCaseItems[platform]();
  });

  it('invalid', () => {
    mkdirSync(baseDir);

    expect(() => {
      getDestDirWithValidate(`@anonymous/${baseDir}`);
    }).toThrow();
  });
});

describe('cleanup', () => {
  it('function can work', () => {
    mkdirSync(baseDir);
    appendFileSync(`${baseDir}/LICENSE`, '-');
    mkdirSync(`${baseDir}/.git`);
    cleanup('test-project');

    expect(existsSync(`${baseDir}/LICENSE`)).toBe(false);
    expect(existsSync(`${baseDir}/.git`)).toBe(false);
  });
});
