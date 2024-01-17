import { CliOption } from '.';
import { Command, CommanderError } from 'commander';
import { CommanderUtil } from '../CommanderUtil';

describe('create', () => {
  it('Commandインスタンスが取得できること', () => {
    const actual = CliOption.create();
    expect(actual).toBeInstanceOf(Command);
  });
});

describe('parse', () => {
  it('強制終了エラーが発生した場合にprocess.exit(0)されること', () => {
    const mockCmd = {
      parse() {
        throw new CommanderError(0, 'hoge', 'piyo');
      },
    } as unknown as Command;
    jest.spyOn(CommanderUtil, 'shouldTerminate').mockReturnValue(true);
    const mockedProcessExit = jest.spyOn(process, 'exit').mockImplementation();

    CliOption.parse(mockCmd, []);
    expect(mockedProcessExit).toHaveBeenCalledWith(0);
  });

  it('予期しない例外が出た場合に、再スローされること', () => {
    const mockCmd = {
      parse() {
        throw new Error('test');
      },
    } as unknown as Command;

    expect(() => {
      CliOption.parse(mockCmd, []);
    }).toThrow();
  });

  it('例外がスローされなかったときに正しいフローで処理されること', () => {
    const mockCmd = {
      parse() {},
      opts() {
        return {
          hoge: 'piyo',
        };
      },
      args: [],
    } as unknown as Command;
    const mockedParseOpts = jest
      .spyOn(CommanderUtil, 'parseOpts')
      .mockReturnValue({
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 'ts-cli',
      });
    const mockedHasCommandLineOptions = jest
      .spyOn(CommanderUtil, 'hasCommandLineOptions')
      .mockReturnValue(true);

    const actual = CliOption.parse(mockCmd, ['hoge']);

    expect(mockedParseOpts).toHaveBeenCalledWith({
      hoge: 'piyo',
    });
    expect(mockedHasCommandLineOptions).toHaveBeenCalledWith(0, 1);
    expect(actual).toStrictEqual({
      author: 'a',
      description: 'b',
      license: 'c',
      projectName: 'd',
      type: 'ts-cli',
      hasCommandLineOptions: true,
    });
  });
});
