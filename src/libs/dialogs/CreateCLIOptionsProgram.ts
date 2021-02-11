import { version } from '../../../package.json';
import { program, Option } from 'commander';
import { ProjectOption, ProjectTypes } from '../../models/ProjectOptions';
import { ProjectOptionDef } from '../../models/ProjectOptions';

/**
 * create CLI options and helps
 *
 * if got undefined arguments then this arguments ignore
 *  ex. tsg xxx -> ignore arguments and proceed
 * if got undefined option then put error to stdout exit program
 *  ex. tsg -x -> exit by put following error message
 *    `error: unknown option '-x'`
 *
 * @returns parsed CLI options
 */
export const createCLIOptionsProgram = () => {
  const banner = `|| TypeScript project Generator ||
`;

  program
    .option(
      ProjectOptionDef.options.author,
      ProjectOptionDef.description.author,
      ProjectOptionDef.default.author
    )
    .option(
      ProjectOptionDef.options.description,
      ProjectOptionDef.description.description,
      ProjectOptionDef.default.description
    )
    .option(
      ProjectOptionDef.options.license,
      ProjectOptionDef.description.license,
      ProjectOptionDef.default.license
    )
    .option(
      ProjectOptionDef.options.projectName,
      ProjectOptionDef.description.projectName,
      ProjectOptionDef.default.projectName
    )
    .addOption(
      new Option(
        ProjectOptionDef.options.type,
        ProjectOptionDef.description.type
      )
        .choices([...ProjectTypes].map((type) => type))
        .default(ProjectOptionDef.default.type)
    )
    .version(version)
    .addHelpText('beforeAll', banner)
    .parse(process.argv);

  const options = {
    ...(program.opts() as ProjectOption),
    useGenerator: hasNotDefinedOptions(program.args.length),
  };

  return options;
};

/**
 * no cli options or only undefined options
 *
 * @param programArgsLength
 */
export const hasNotDefinedOptions = (programArgsLength: number) => {
  return process.argv.length - 2 - programArgsLength === 0;
};
