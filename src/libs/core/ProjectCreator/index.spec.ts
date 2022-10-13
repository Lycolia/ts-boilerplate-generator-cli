import { existsSync, rmSync, mkdirSync, appendFileSync } from 'fs';
import path from 'path';
import { ProjectCreator } from '.';
import { TestUtil } from 'src/libs/core/TestUtil';
import { MyError } from 'src/libs/core/MyError';
import { ErrorReasons } from 'src/models/ErrorReasons';

const platform = TestUtil.getTestingPlatform();
const baseDir = 'test-project';

afterEach(() => {
  if (existsSync(baseDir)) {
    rmSync(baseDir, { force: true, recursive: true });
  }
});

describe('getDestDirWithValidate', () => {
  const testCaseItems = {
    development() {
      const actual = ProjectCreator.getDestDirWithValidate(
        `@anonymous/${baseDir}`
      );

      if (MyError.hasError(actual)) {
        throw new Error('Failure');
      }
      expect(actual.dirName).toBe(baseDir);
      expect(actual.fullPath).toBe(path.join(process.cwd(), baseDir));
    },
    only_node() {
      const actual = ProjectCreator.getDestDirWithValidate(
        `@anonymous/${baseDir}`
      );
      if (MyError.hasError(actual)) {
        expect(actual.reason).toBe(ErrorReasons.gitNotFound);
      } else {
        throw new Error('Failure');
      }
    },
    node_git() {
      const actual = ProjectCreator.getDestDirWithValidate(
        `@anonymous/${baseDir}`
      );
      if (MyError.hasError(actual)) {
        expect(actual.reason).toBe(ErrorReasons.gitNotConfigure);
      } else {
        throw new Error('Failure');
      }
    },
    node_git_conf() {
      const actual = ProjectCreator.getDestDirWithValidate(
        `@anonymous/${baseDir}`
      );
      if (MyError.hasError(actual)) {
        throw new Error('Failure');
      }
      expect(actual.dirName).toBe(baseDir);
      expect(actual.fullPath).toBe(path.join(process.cwd(), baseDir));
    },
    node_git_conf_npm() {
      const actual = ProjectCreator.getDestDirWithValidate(
        `@anonymous/${baseDir}`
      );

      if (MyError.hasError(actual)) {
        throw new Error('Failure');
      }
      expect(actual.dirName).toBe(baseDir);
      expect(actual.fullPath).toBe(path.join(process.cwd(), baseDir));
    },
  };

  it('valid', () => {
    testCaseItems[platform]();
  });

  it('invalid', () => {
    mkdirSync(baseDir);

    const actual = ProjectCreator.getDestDirWithValidate(
      `@anonymous/${baseDir}`
    );

    if (MyError.hasError(actual)) {
      expect(actual.reason).toStrictEqual(ErrorReasons.existsDestPath);
    } else {
      throw new Error('Failure');
    }
  });
});

describe('cleanup', () => {
  it('function can work', () => {
    mkdirSync(baseDir);
    appendFileSync(`${baseDir}/LICENSE`, '-');
    mkdirSync(`${baseDir}/.git`);
    ProjectCreator.cleanup('test-project');

    expect(existsSync(`${baseDir}/LICENSE`)).toBe(false);
    expect(existsSync(`${baseDir}/.git`)).toBe(false);
  });
});
