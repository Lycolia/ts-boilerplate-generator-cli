const TestingPlatform = {
  'only-node': 'only_node',
  'node-git': 'node_git',
  'node-git-conf': 'node_git_conf',
} as const;

export namespace TestUtil {
  export const getExecPlatform = () => {
    if (
      process.env.EXEC_PLATFORM === TestingPlatform['only-node'] ||
      process.env.EXEC_PLATFORM === TestingPlatform['node-git'] ||
      process.env.EXEC_PLATFORM === TestingPlatform['node-git-conf']
    ) {
      return process.env.EXEC_PLATFORM;
    } else {
      return;
    }
  };
}
