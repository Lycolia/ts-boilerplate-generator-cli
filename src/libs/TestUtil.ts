/**
 * testing platform
 * this is container names, but except 'development'
 */
type TestingPlatform =
  | 'development'
  | 'only_node'
  | 'node_git'
  | 'node_git_conf'
  | 'node_git_conf_npm7';

/**
 * get execute platform for testing
 * @returns
 */
export const getTestingPlatform = (): TestingPlatform => {
  switch (process.env.EXEC_PLATFORM) {
    case 'only-node':
      return 'only_node';
    case 'node-git':
      return 'node_git';
    case 'node-git-conf':
      return 'node_git_conf';
    case 'node-git-conf-npm7':
      return 'node_git_conf_npm7';
    default:
      return 'development';
  }
};
