import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { CLIOptionsProgramUtil } from './util';
import { MyError } from '../../util/MyError';
import { ErrorReasons } from '../../../models/ErrorReasons';

// TODO テストが巨大すぎるので何とかしたいがこれ以上関数を小分けにするのも…
describe('parseOpts', () => {
  const testItems = [
    {
      name: 'authorがstringでない場合にエラーになること',
      param: {
        author: 123,
        description: 'a',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: new MyError(ErrorReasons.invalidAuthorOptions),
    },
    {
      name: 'authorが空文字の場合にauthorのみに空文字が設定されること',
      param: {
        author: '',
        description: 'a',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: {
        author: '',
        description: 'a',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
    },
    {
      name: 'authorに文字列が設定されている場合にauthorのみにその文字列が設定されること',
      param: {
        author: 'hoge',
        description: 'a',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: {
        author: 'hoge',
        description: 'a',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
    },
    {
      name: 'descriptionがstringでない場合にエラーになること',
      param: {
        author: 'a',
        description: 123,
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: new MyError(ErrorReasons.invalidDescriptionOptions),
    },
    {
      name: 'descriptionが空文字の場合にdescriptionのみに空文字が設定されること',
      param: {
        author: 'a',
        description: '',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: {
        author: 'a',
        description: '',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
    },
    {
      name: 'descriptionに文字列が設定されている場合にdescriptionのみにその文字列が設定されること',
      param: {
        author: 'a',
        description: 'hoge',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: {
        author: 'a',
        description: 'hoge',
        license: 'b',
        projectName: 'c',
        type: 'ts-cli',
      },
    },
    {
      name: 'licenseがstringでない場合にエラーになること',
      param: {
        author: 'a',
        description: 'b',
        license: 123,
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: new MyError(ErrorReasons.invalidLicenseOptions),
    },
    {
      name: 'licenseが空文字の場合にlicenseのみに空文字が設定されること',
      param: {
        author: 'a',
        description: 'b',
        license: '',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: {
        author: 'a',
        description: 'b',
        license: '',
        projectName: 'c',
        type: 'ts-cli',
      },
    },
    {
      name: 'licenseに文字列が設定されている場合にlicenseのみにその文字列が設定されること',
      param: {
        author: 'a',
        description: 'c',
        license: 'hoge',
        projectName: 'c',
        type: 'ts-cli',
      },
      expect: {
        author: 'a',
        description: 'c',
        license: 'hoge',
        projectName: 'c',
        type: 'ts-cli',
      },
    },
    {
      name: 'projectNameがstringでない場合にエラーになること',
      param: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 123,
        type: 'ts-cli',
      },
      expect: new MyError(ErrorReasons.invalidProjectNameOptions),
    },
    {
      name: 'projectNameが空文字の場合にprojectNameのみに空文字が設定されること',
      param: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: '',
        type: 'ts-cli',
      },
      expect: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: '',
        type: 'ts-cli',
      },
    },
    {
      name: 'projectNameに文字列が設定されている場合にprojectNameのみにその文字列が設定されること',
      param: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'hoge',
        type: 'ts-cli',
      },
      expect: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'hoge',
        type: 'ts-cli',
      },
    },
    {
      name: 'typeがstringでない場合にエラーになること',
      param: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 123,
      },
      expect: new MyError(ErrorReasons.invalidTypeOptions),
    },
    {
      name: 'typeがts-cliかts-nextでない場合にエラーになること',
      param: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 'hoge',
      },
      expect: new MyError(ErrorReasons.invalidTypeOptions),
    },
    {
      name: 'typeに文字列が設定されている場合にtypeのみにその文字列が設定されること',
      param: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 'ts-cli',
      },
      expect: {
        author: 'a',
        description: 'b',
        license: 'c',
        projectName: 'd',
        type: 'ts-cli',
      },
    },
  ];

  testItems.forEach((item) => {
    it(item.name, () => {
      const actual = CLIOptionsProgramUtil.parseOpts(item.param);

      assert.deepStrictEqual(actual, item.expect);
    });
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

    assert.strictEqual(actual, true);
  });

  it('オプションパラメーターがあるケースで対話モード判定になること', () => {
    process.argv.push('--hoge');
    const actual = CLIOptionsProgramUtil.hasCommandLineOptions(1);

    assert.strictEqual(actual, true);
  });
});
