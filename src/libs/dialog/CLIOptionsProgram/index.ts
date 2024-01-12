import { version } from 'package.json';
import { Option, Command, OptionValues, CommanderError } from 'commander';
import { ProjectOptionDef, ProjectTypes } from '../../../models/ProjectOptions';
import { MyError } from '../../util/MyError';
import { CLIOptionsProgramUtil } from './util';
import { ErrorReasons } from '../../../models/ErrorReasons';

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
    const banner = '|| TypeScript project Generator ||\n';

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
      .exitOverride()
      .addHelpText('beforeAll', banner);

    try {
      cmd.parse(process.argv);
    } catch (error) {
      if (error instanceof CommanderError) {
        // 入力不正と思われるのでハンドリングする
        throw new MyError(ErrorReasons.invalidOptions(error.message));
      } else {
        // 想定外のエラーなので再スローする
        throw error;
      }
    }

    return cmd.opts();
  };

  export const parseOpts = (optionValues: OptionValues) => {
    const opts = CLIOptionsProgramUtil.parseOpts(optionValues);

    return {
      ...opts,
      hasCommandlineOptions: CLIOptionsProgramUtil.hasCommandLineOptions(
        optionValues.args.length
      ),
    };
  };
}
