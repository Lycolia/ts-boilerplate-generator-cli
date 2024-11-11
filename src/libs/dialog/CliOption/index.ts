import { version } from 'package.json';
import { Option, Command, CommanderError } from 'commander';
import { ProjectOptionDef, ProjectTypes } from '../../../models/ProjectOptions';
import { CommanderUtil } from '../CommanderUtil';

export namespace CliOption {
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

    return cmd;
  };

  /**
   * @throws
   */
  export const parse = (cmd: Command, argv: string[]) => {
    try {
      cmd.parse(argv);

      const cliOptions = CommanderUtil.parseOpts(cmd.opts());
      const hasCommandLineOptions = CommanderUtil.hasCommandLineOptions(
        cmd.args.length,
        argv.length
      );

      return {
        ...cliOptions,
        hasCommandLineOptions
      };
    } catch (error) {
      if (
        error instanceof CommanderError &&
        CommanderUtil.shouldTerminate(error.code)
      ) {
        // ヘルプやバージョンを指定すると例外が飛ぶので、この階層で正常終了させる
        process.exit(0);
      } else {
        // 想定外のエラーなので再スローする
        throw error;
      }
    }
  };
}
