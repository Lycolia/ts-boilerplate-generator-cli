import { getTestingPlatform } from '../../TestUtil';
import * as git from '../Git';

jest.spyOn(git, 'validateInstalled');
jest.spyOn(git, 'canCommiting');

const platform = getTestingPlatform();

describe('validateInstalled', () => {
  const testCaseItems = {
    development: {
      name: 'development',
      test() {
        git.validateInstalled();

        expect(git.validateInstalled).toBeCalled();
        expect(git.validateInstalled).toReturn();
      },
    },
    only_node: {
      name: 'only-node',
      test() {
        expect(() => {
          git.validateInstalled();
        }).toThrow();
        expect(git.validateInstalled).toBeCalled();
      },
    },
    node_git: {
      name: 'node-git',
      test() {
        git.validateInstalled();

        expect(git.validateInstalled).toBeCalled();
        expect(git.validateInstalled).toReturn();
      },
    },
    node_git_conf: {
      name: 'node-git-conf',
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
      name: 'development',
      test() {
        expect(git.canCommiting()).toBe(true);
      },
    },
    only_node: {
      name: 'only-node',
      test() {
        expect(() => {
          git.canCommiting();
        }).toThrow();
        expect(git.canCommiting).toBeCalled();
      },
    },
    node_git: {
      name: 'node-git',
      test() {
        expect(git.canCommiting()).toBe(false);
      },
    },
    node_git_conf: {
      name: 'node-git-conf',
      test() {
        expect(git.canCommiting()).toBe(true);
      },
    },
  };

  it('function can work', () => {
    testCaseItems[platform].test();
  });
});
