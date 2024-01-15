import { version } from 'package.json';
import { Option, Command, OptionValues, CommanderError } from 'commander';
import { ProjectOptionDef, ProjectTypes } from '../../../models/ProjectOptions';
import { ComannderUtil } from '../ComannderUtil';

type ParsingOptionSource = {
  opts: OptionValues;
  srcArgsLength: number;
};

export namespace CliOption {
  /** process.argvを参照し、オプションパラメーターを取得する */
  export const get = (argv: string[]): ParsingOptionSource => {
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
      cmd.parse(argv);
    } catch (error) {
      if (
        error instanceof CommanderError &&
        ComannderUtil.shouldTerminate(error.code)
      ) {
        // ヘルプやバージョンを指定すると例外が飛ぶので、この階層で正常終了させる
        process.exit(0);
      } else {
        // 想定外のエラーなので再スローする
        throw error;
      }
    }

    return {
      opts: cmd.opts(),
      srcArgsLength: cmd.args.length,
    };
  };

  /** オプションパラメーターをパースする */
  export const parse = (optionSrc: ParsingOptionSource) => {
    const opts = ComannderUtil.parseOpts(optionSrc.opts);

    return {
      ...opts,
      hasCommandLineOptions: ComannderUtil.hasCommandLineOptions(
        optionSrc.srcArgsLength
      ),
    };
  };
}
