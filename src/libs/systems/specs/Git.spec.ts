import { getTestingPlatform } from '../../TestUtil';
import * as git from '../Git';

jest.spyOn(git, 'validateInstalled');
jest.spyOn(git, 'canCommiting');

const platform = getTestingPlatform();

describe('validateInstalled', () => {
  const testCaseItems = {
    development() {
      git.validateInstalled();

      expect(git.validateInstalled).toBeCalled();
      expect(git.validateInstalled).toReturn();
    },
    only_node() {
      expect(() => {
        git.validateInstalled();
      }).toThrow();
      expect(git.validateInstalled).toBeCalled();
    },
    node_git() {
      git.validateInstalled();

      expect(git.validateInstalled).toBeCalled();
      expect(git.validateInstalled).toReturn();
    },
    node_git_conf() {
      git.validateInstalled();

      expect(git.validateInstalled).toBeCalled();
      expect(git.validateInstalled).toReturn();
    },
  };

  it('function can work', () => {
    testCaseItems[platform]();
  });
});

describe('canCommiting', () => {
  const testCaseItems = {
    development() {
      expect(git.canCommiting()).toBe(true);
    },
    only_node() {
      expect(() => {
        git.canCommiting();
      }).toThrow();
      expect(git.canCommiting).toBeCalled();
    },
    node_git() {
      expect(git.canCommiting()).toBe(false);
    },
    node_git_conf() {
      expect(git.canCommiting()).toBe(true);
    },
  };

  it('function can work', () => {
    testCaseItems[platform]();
  });
});
