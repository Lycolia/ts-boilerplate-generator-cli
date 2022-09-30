import { getTestingPlatform } from '.';

describe('getTestingPlatform', () => {
  it('is equality getTestingPlatform to EXEC_PLATFORM', () => {
    const env = process.env.EXEC_PLATFORM;
    const platform = getTestingPlatform();

    if (env === undefined) {
      expect(platform).toBe('development');
    } else if (env === 'only-node') {
      expect(platform).toBe('only_node');
    } else if (env === 'node-git') {
      expect(platform).toBe('node_git');
    } else if (env === 'node-git-conf') {
      expect(platform).toBe('node_git_conf');
    }
  });
});
