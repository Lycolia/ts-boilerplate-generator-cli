import { getTestingPlatform } from '../../TestUtil';
import * as git from '../Git';

jest.spyOn(git, 'validateInstalled');
jest.spyOn(git, 'canCommiting');

const platform = getTestingPlatform();

describe('validateInstalled', () => {
  const testCaseItems = {
    development: {
      test() {
        git.validateInstalled();

        expect(git.validateInstalled).toBeCalled();
        expect(git.validateInstalled).toReturn();
      },
    },
    only_node: {
      test() {
        expect(() => {
          git.validateInstalled();
        }).toThrow();
        expect(git.validateInstalled).toBeCalled();
      },
    },
    node_git: {
      test() {
        git.validateInstalled();

        expect(git.validateInstalled).toBeCalled();
        expect(git.validateInstalled).toReturn();
      },
    },
    node_git_conf: {
      test() {
        git.validateInstalled();

        expect(git.validateInstalled).toBeCalled();
        expect(git.validateInstalled).toReturn();
      },
    },
  };

  it('function can work', () => {
    testCaseItems[platform].test();
  });
});

describe('canCommiting', () => {
  const testCaseItems = {
    development: {
      test() {
        expect(git.canCommiting()).toBe(true);
      },
    },
    only_node: {
      test() {
        expect(() => {
          git.canCommiting();
        }).toThrow();
        expect(git.canCommiting).toBeCalled();
      },
    },
    node_git: {
      test() {
        expect(git.canCommiting()).toBe(false);
      },
    },
    node_git_conf: {
      test() {
        expect(git.canCommiting()).toBe(true);
      },
    },
  };

  it('function can work', () => {
    testCaseItems[platform].test();
  });
});
