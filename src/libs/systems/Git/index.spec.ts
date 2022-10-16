import { MyError } from 'src/libs/core/MyError';
import { TestUtil } from 'src/libs/core/TestUtil';
import { ErrorReasons } from 'src/models/ErrorReasons';
import { Git } from '.';

const platform = TestUtil.getTestingPlatform();

describe('validateInstalled', () => {
  const testCaseItems = {
    development() {
      const actual = Git.validateInstalled();

      if (MyError.hasError(actual)) {
        throw new Error('Failure');
      } else {
        expect(actual).toBeUndefined();
      }
    },
    only_node() {
      const actual = Git.validateInstalled();
      if (MyError.hasError(actual)) {
        expect(actual.reason).toStrictEqual(ErrorReasons.gitNotFound);
      } else {
        throw new Error('Failure');
      }
    },
    node_git() {
      const actual = Git.validateInstalled();

      if (MyError.hasError(actual)) {
        throw new Error('Failure');
      } else {
        expect(actual).toBeUndefined();
      }
    },
    node_git_conf() {
      const actual = Git.validateInstalled();

      if (MyError.hasError(actual)) {
        throw new Error('Failure');
      } else {
        expect(actual).toBeUndefined();
      }
    },
    node_git_conf_npm() {
      const actual = Git.validateInstalled();

      if (MyError.hasError(actual)) {
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
      const actual = Git.validateCommiting();
      expect(actual).toBeUndefined();
    },
    only_node() {
      const actual = Git.validateCommiting();

      if (MyError.hasError(actual)) {
        expect(actual.reason).toStrictEqual(ErrorReasons.unmanagedException);
      } else {
        throw new Error('Failure');
      }
    },
    node_git() {
      const actual = Git.validateCommiting();

      if (MyError.hasError(actual)) {
        expect(actual.reason).toStrictEqual(ErrorReasons.gitNotConfigure);
      } else {
        throw new Error('Failure');
      }
    },
    node_git_conf() {
      const actual = Git.validateCommiting();
      expect(actual).toBeUndefined();
    },
    node_git_conf_npm() {
      const actual = Git.validateCommiting();
      expect(actual).toBeUndefined();
    },
  };

  it('function can work', () => {
    testCaseItems[platform]();
  });
});
