import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { CLIOptionsProgramUtil } from './util';
import { MyError } from '../../util/MyError';
import { ErrorReasons } from '../../../models/ErrorReasons';

// TODO テストが巨大すぎるので何とかしたいがこれ以上関数を小分けにするのも…
describe('parseOpts', () => {
  it('authorがstringでない場合に例外がスローされること', () => {
    assert.throws(() => {
      CLIOptionsProgramUtil.parseOpts({
        author: 123,
        description: 'a',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      });
    }, new MyError(ErrorReasons.invalidAuthorOptions));
  });

  it('authorが空文字の場合にauthorのみに空文字が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('authorに文字列が設定されている場合にauthorのみにその文字列が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('descriptionがstringでない場合にエラーになること', () => {
    assert.throws(() => {
      CLIOptionsProgramUtil.parseOpts({
        author: 'a',
        description: 123,
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      });
    }, new MyError(ErrorReasons.invalidDescriptionOptions));
  });

  it('descriptionが空文字の場合にdescriptionのみに空文字が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('descriptionに文字列が設定されている場合にdescriptionのみにその文字列が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('licenseがstringでない場合にエラーになること', () => {
    assert.throws(() => {
      CLIOptionsProgramUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 123,
        projectName: 'c',
        type: 'ts-cli',
      });
    }, new MyError(ErrorReasons.invalidLicenseOptions));
  });

  it('licenseが空文字の場合にlicenseのみに空文字が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('licenseに文字列が設定されている場合にlicenseのみにその文字列が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('projectNameがstringでない場合にエラーになること', () => {
    assert.throws(() => {
      CLIOptionsProgramUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 123,
        type: 'ts-cli',
      });
    }, new MyError(ErrorReasons.invalidProjectNameOptions));
  });

  it('projectNameが空文字の場合にprojectNameのみに空文字が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('projectNameに文字列が設定されている場合にprojectNameのみにその文字列が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });

  it('typeがstringでない場合にエラーになること', () => {
    assert.throws(() => {
      CLIOptionsProgramUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 123,
      });
    }, new MyError(ErrorReasons.invalidTypeOptions));
  });

  it('typeがts-cliかts-nextでない場合にエラーになること', () => {
    assert.throws(() => {
      CLIOptionsProgramUtil.parseOpts({
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 'hoge',
      });
    }, new MyError(ErrorReasons.invalidTypeOptions));
  });

  it('typeに文字列が設定されている場合にtypeのみにその文字列が設定されること', () => {
    const actual = CLIOptionsProgramUtil.parseOpts({
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
    assert.deepStrictEqual(actual, expected);
  });
});

describe('isInteractive', () => {
  afterEach(() => {
    process.argv.length = 0;
    process.argv.push('/path/to/node');
    process.argv.push('/path/to/index.js');
  });

  it('オプションパラメーターがないケースで対話モード判定にならないこと', () => {
    const actual = CLIOptionsProgramUtil.hasCommandLineOptions(0);

    assert.strictEqual(actual, false);
  });

  it('オプションパラメーターがあるケースで対話モード判定になること', () => {
    process.argv.push('--hoge');
    const actual = CLIOptionsProgramUtil.hasCommandLineOptions(1);

    assert.strictEqual(actual, true);
  });
});
