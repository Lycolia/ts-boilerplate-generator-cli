/**
 * generation project types
 */
export const ProjectTypes = [
  'ts-server',
  'ts-react',
  'ts-next',
  'ts-cli',
] as const;

/**
 * generation project types
 * related by ProjectOptions.ProjectTypes
 */
export type ProjectType = typeof ProjectTypes[number];

/**
 * project context
 */
export type ProjectOption = {
  author: string;
  description: string;
  license: string;
  projectName: string;
  type: ProjectType;
};

/**
 * project context defines
 */
export const ProjectOptionDef = {
  options: {
    author: '-a, --author <author>',
    description: '-d, --description <description>',
    license: '-l, --license <license>',
    projectName: '-p, --project-name <projectName>',
    type: '-t, --type <type>',
  },
  description: {
    author: 'project author',
    description: 'project description',
    license: 'project license',
    projectName: 'project name',
    type: 'project type',
  },
  default: {
    author: 'unknown',
    description: 'no description',
    license: 'MIT',
    projectName: '@unknown/no-name-project',
    type: 'ts-server',
  } as ProjectOption,
};
