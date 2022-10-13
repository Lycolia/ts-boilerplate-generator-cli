import { TestUtil } from 'src/libs/core/TestUtil';
import { Git } from '.';

jest.spyOn(Git, 'validateInstalled');
jest.spyOn(Git, 'canCommiting');

const platform = TestUtil.getTestingPlatform();

describe('validateInstalled', () => {
  const testCaseItems = {
    development() {
      Git.validateInstalled();

      expect(Git.validateInstalled).toBeCalled();
      expect(Git.validateInstalled).toReturn();
    },
    only_node() {
      expect(() => {
        Git.validateInstalled();
      }).toThrow();
    },
    node_git() {
      Git.validateInstalled();

      expect(Git.validateInstalled).toBeCalled();
      expect(Git.validateInstalled).toReturn();
    },
    node_git_conf() {
      Git.validateInstalled();

      expect(Git.validateInstalled).toBeCalled();
      expect(Git.validateInstalled).toReturn();
    },
    node_git_conf_npm() {
      Git.validateInstalled();

      expect(Git.validateInstalled).toBeCalled();
      expect(Git.validateInstalled).toReturn();
    },
  };

  it('function can work', () => {
    testCaseItems[platform]();
  });
});

describe('canCommiting', () => {
  const testCaseItems = {
    development() {
      expect(Git.canCommiting()).toBe(true);
    },
    only_node() {
      expect(() => {
        Git.canCommiting();
      }).toThrow();
    },
    node_git() {
      expect(Git.canCommiting()).toBe(false);
    },
    node_git_conf() {
      expect(Git.canCommiting()).toBe(true);
    },
    node_git_conf_npm() {
      expect(Git.canCommiting()).toBe(true);
    },
  };

  it('function can work', () => {
    testCaseItems[platform]();
  });
});
