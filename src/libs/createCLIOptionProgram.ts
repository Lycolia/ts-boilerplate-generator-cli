import { version } from '../../package.json';
import { program } from 'commander';

export type ProjectType = 'vanilla' | 'react-ts' | 'cli-ts';

/**
 * this CLI options
 */
export type CLIOptions = {
  author: string;
  description: string;
  license: string;
  projectName: string;
  type: string;
};

/**
 * defined CLI options and helps
 *
 * @returns parsed CLI options
 */
export const createCLIOptionProgram = () => {
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
    .option('-t, --type <type>', 'project type', 'vanilla')
    .version(version)
    .addHelpText('beforeAll', banner)
    .parse(process.argv);
  return program.opts() as CLIOptions;
};
