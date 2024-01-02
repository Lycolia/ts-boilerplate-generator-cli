import { version } from 'package.json';
import { Option, Command } from 'commander';
import { ProjectOptionDef, ProjectTypes } from '../../../models/ProjectOptions';
import { MyError } from '../../util/MyError';
import { CLIOptionsProgramUtil } from './util';

export namespace CLIOptionsProgram {
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
  export const create = () => {
    const banner = `|| TypeScript project Generator ||
`;

    const cmd = new Command();
    cmd
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

    const opts = CLIOptionsProgramUtil.parseOpts(cmd.opts());

    if (opts instanceof MyError) {
      return opts;
    } else {
      return {
        ...opts,
        isInteractive: CLIOptionsProgramUtil.isInteractive(cmd.args.length),
      };
    }
  };
}
