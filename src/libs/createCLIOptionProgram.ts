import { version } from '../../package.json';
import { program } from 'commander';

export type ProjectType = 'vanilla' | 'react-ts' | 'cli-ts';

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
    .option('-p, --project-name <author>', 'project name', 'no-name-project')
    .option('-t, --type <author>', 'project type', 'vanilla')
    .version(version)
    .addHelpText('beforeAll', banner)
    .parse(process.argv);
  return program.opts();
};
