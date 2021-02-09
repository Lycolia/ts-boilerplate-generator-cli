import { version } from '../../package.json';
import { program, Option } from 'commander';

export type ProjectType = 'vanilla' | 'react-ts' | 'cli-ts';

/**
 * this CLI options
 */
export type CLIOptions = {
  author: string;
  description: string;
  license: string;
  projectName: string;
  type: ProjectType;
  yeoman: boolean;
};

/**
 * defined CLI options and helps
 *
 * @returns parsed CLI options
 */
export const createCLIOptionsProgram = () => {
  const banner = `|| TypeScript project Generator ||
`;
  program
    .option('-a, --author <author>', 'project author', 'unknown')
    .option(
      '-d, --description <description>',
      'project description',
      'no description'
    )
    .option('-l, --license <license>', 'project license', 'MIT')
    .option(
      '-p, --project-name <projectName>',
      'project name',
      'no-name-project'
    )
    .addOption(
      new Option('-t, --type <type>', 'project type')
        .choices(['vanilla', 'react-ts', 'cli-ts'])
        .default('vanilla')
    )
    .option('-y, --yeoman', 'use yeoman style generator', false)
    .version(version)
    .addHelpText('beforeAll', banner)
    .parse(process.argv);
  return program.opts() as CLIOptions;
};
