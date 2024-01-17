import { MyError } from '../../util/MyError';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { CommanderUtil } from '.';

// TODO テストが巨大すぎるので何とかしたいがこれ以上関数を小分けにするのも…
describe('parseOpts', () => {
  it('authorがstringでない場合に例外がスローされること', () => {
    expect(() => {
      CommanderUtil.parseOpts({
        author: 123,
        description: 'a',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      });
    }).toThrow(new MyError(ErrorReasons.invalidAuthorOptions));
  });

  it('authorが空文字の場合にauthorのみに空文字が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: '',
      description: 'a',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    });
    const expected = {
      author: '',
      description: 'a',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('authorに文字列が設定されている場合にauthorのみにその文字列が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'hoge',
      description: 'a',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    });
    const expected = {
      author: 'hoge',
      description: 'a',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('descriptionがstringでない場合にエラーになること', () => {
    expect(() => {
      CommanderUtil.parseOpts({
        author: 'a',
        description: 123,
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      });
    }).toThrow(new MyError(ErrorReasons.invalidDescriptionOptions));
  });

  it('descriptionが空文字の場合にdescriptionのみに空文字が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'a',
      description: '',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    });
    const expected = {
      author: 'a',
      description: '',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('descriptionに文字列が設定されている場合にdescriptionのみにその文字列が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'a',
      description: 'hoge',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    });
    const expected = {
      author: 'a',
      description: 'hoge',
      license: 'b',
      projectName: 'c',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('licenseがstringでない場合にエラーになること', () => {
    expect(() => {
      CommanderUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 123,
        projectName: 'c',
        type: 'ts-cli',
      });
    }).toThrow(new MyError(ErrorReasons.invalidLicenseOptions));
  });

  it('licenseが空文字の場合にlicenseのみに空文字が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'a',
      description: 'b',
      license: '',
      projectName: 'c',
      type: 'ts-cli',
    });
    const expected = {
      author: 'a',
      description: 'b',
      license: '',
      projectName: 'c',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('licenseに文字列が設定されている場合にlicenseのみにその文字列が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'a',
      description: 'c',
      license: 'hoge',
      projectName: 'c',
      type: 'ts-cli',
    });
    const expected = {
      author: 'a',
      description: 'c',
      license: 'hoge',
      projectName: 'c',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('projectNameがstringでない場合にエラーになること', () => {
    expect(() => {
      CommanderUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 123,
        type: 'ts-cli',
      });
    }).toThrow(new MyError(ErrorReasons.invalidProjectNameOptions));
  });

  it('projectNameが空文字の場合にprojectNameのみに空文字が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'a',
      description: 'b',
      license: 'c',
      projectName: '',
      type: 'ts-cli',
    });
    const expected = {
      author: 'a',
      description: 'b',
      license: 'c',
      projectName: '',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('projectNameに文字列が設定されている場合にprojectNameのみにその文字列が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'a',
      description: 'b',
      license: 'c',
      projectName: 'hoge',
      type: 'ts-cli',
    });
    const expected = {
      author: 'a',
      description: 'b',
      license: 'c',
      projectName: 'hoge',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });

  it('typeがstringでない場合にエラーになること', () => {
    expect(() => {
      CommanderUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 123,
      });
    }).toThrow(new MyError(ErrorReasons.invalidTypeOptions));
  });

  it('typeがts-cliかts-nextでない場合にエラーになること', () => {
    expect(() => {
      CommanderUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 'hoge',
      });
    }).toThrow(new MyError(ErrorReasons.invalidTypeOptions));
  });

  it('typeに文字列が設定されている場合にtypeのみにその文字列が設定されること', () => {
    const actual = CommanderUtil.parseOpts({
      author: 'a',
      description: 'b',
      license: 'c',
      projectName: 'd',
      type: 'ts-cli',
    });
    const expected = {
      author: 'a',
      description: 'b',
      license: 'c',
      projectName: 'd',
      type: 'ts-cli',
    };
    expect(actual).toStrictEqual(expected);
  });
});

describe('isInteractive', () => {
  it('オプションパラメーターがないケースで対話モード判定にならないこと', () => {
    // tsg呼び出しの時
    const actual = CommanderUtil.hasCommandLineOptions(2, 0);

    expect(actual).toBe(false);
  });

  it('オプションパラメーターがあるケースで対話モード判定になること', () => {
    // tsg --hoge呼び出しの時
    const actual = CommanderUtil.hasCommandLineOptions(3, 1);

    expect(actual).toBe(true);
  });
});
