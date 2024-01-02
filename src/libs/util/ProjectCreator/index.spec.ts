import { existsSync, rmSync, mkdirSync, appendFileSync } from 'fs';
import path from 'path';
import { ProjectCreator } from '.';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../MyError';
import { TestUtil } from '../TestUtil';

const platform = TestUtil.getExecPlatform();
const baseDir = 'test-project';

afterEach(() => {
  if (existsSync(baseDir)) {
    rmSync(baseDir, { force: true, recursive: true });
  }
});

describe('getDestDirWithValidate', () => {
  it('destination path is not exists', () => {
    const testCaseItems = {
      development() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );

        if (actual instanceof MyError) return;

        expect(actual.dirName).toBe(baseDir);
        expect(actual.fullPath).toBe(path.join(process.cwd(), baseDir));
      },
      only_node() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );
        if (actual instanceof MyError) {
          expect(actual.reason).toBe(ErrorReasons.gitNotFound);
        } else {
          throw new Error('Failure');
        }
      },
      node_git() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );
        if (actual instanceof MyError) {
          expect(actual.reason).toBe(ErrorReasons.gitNotConfigure);
        } else {
          throw new Error('Failure');
        }
      },
      node_git_conf() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );

        if (actual instanceof MyError) {
          throw new Error('Failure');
        }
        expect(actual.dirName).toBe(baseDir);
        expect(actual.fullPath).toBe(path.join(process.cwd(), baseDir));
      },
    };

    testCaseItems[platform]();
  });

  it('destination path is exists', () => {
    const testCaseItems = {
      development() {
        mkdirSync(baseDir);

        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );

        if (actual instanceof MyError) {
          expect(actual.reason).toStrictEqual(ErrorReasons.existsDestPath);
        } else {
          throw new Error('Failure');
        }
      },
      only_node() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );
        if (actual instanceof MyError) {
          expect(actual.reason).toBe(ErrorReasons.gitNotFound);
        } else {
          throw new Error('Failure');
        }
      },
      node_git() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );
        if (actual instanceof MyError) {
          expect(actual.reason).toBe(ErrorReasons.gitNotConfigure);
        } else {
          throw new Error('Failure');
        }
      },
      node_git_conf() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );
        if (actual instanceof MyError) {
          throw new Error('Failure');
        }
        expect(actual.dirName).toBe(baseDir);
        expect(actual.fullPath).toBe(path.join(process.cwd(), baseDir));
      },
      node_git_conf_npm() {
        const actual = ProjectCreator.getDestDirWithValidate(
          `@anonymous/${baseDir}`
        );

        if (actual instanceof MyError) {
          throw new Error('Failure');
        }
        expect(actual.dirName).toBe(baseDir);
        expect(actual.fullPath).toBe(path.join(process.cwd(), baseDir));
      },
    };

    testCaseItems[platform]();
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