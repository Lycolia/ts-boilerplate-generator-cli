import { MyError } from 'src/libs/util/my-error';
import { TestUtil } from 'src/libs/util/TestUtil';
import { ErrorReasons } from 'src/models/ErrorReasons';
import { Git } from '.';

const platform = TestUtil.getExecPlatform();

describe('validateInstalled', () => {
  const testCaseItems = {
    development() {
      const actual = Git.hasInstalled();

      if (actual instanceof MyError) {
        throw new Error('Failure');
      } else {
        expect(actual).toBeUndefined();
      }
    },
    only_node() {
      const actual = Git.hasInstalled();
      if (actual instanceof MyError) {
        expect(actual.reason).toStrictEqual(ErrorReasons.gitNotFound);
      } else {
        throw new Error('Failure');
      }
    },
    node_git() {
      const actual = Git.hasInstalled();

      if (actual instanceof MyError) {
        throw new Error('Failure');
      } else {
        expect(actual).toBeUndefined();
      }
    },
    node_git_conf() {
      const actual = Git.hasInstalled();

      if (actual instanceof MyError) {
        throw new Error('Failure');
      } else {
        expect(actual).toBeUndefined();
      }
    },
    node_git_conf_npm() {
      const actual = Git.hasInstalled();

      if (actual instanceof MyError) {
        throw new Error('Failure');
      } else {
        expect(actual).toBeUndefined();
      }
    },
  };

  it('function can work', () => {
    testCaseItems[platform]();
  });
});

describe('validateCommiting', () => {
  const testCaseItems = {
    development() {
      const actual = Git.canCommit();
      expect(actual).toBeUndefined();
    },
    only_node() {
      const actual = Git.canCommit();

      if (actual instanceof MyError) {
        expect(actual.reason).toStrictEqual(ErrorReasons.unmanagedException);
      } else {
        throw new Error('Failure');
      }
    },
    node_git() {
      const actual = Git.canCommit();

      if (actual instanceof MyError) {
        expect(actual.reason).toStrictEqual(ErrorReasons.gitNotConfigure);
      } else {
        throw new Error('Failure');
      }
    },
    node_git_conf() {
      const actual = Git.canCommit();
      expect(actual).toBeUndefined();
    },
    node_git_conf_npm() {
      const actual = Git.canCommit();
      expect(actual).toBeUndefined();
    },
  };

  it('function can work', () => {
    testCaseItems[platform]();
  });
});
