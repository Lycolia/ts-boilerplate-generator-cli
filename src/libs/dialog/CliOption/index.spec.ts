import { describe, it } from 'node:test';
import assert from 'node:assert';
import { CliOption } from '.';
import { ProjectOptionDef } from '../../../models/ProjectOptions';

describe('get', () => {
  const createArgv = (additionalArgv: string[]) => {
    return ['/path/to/node', '/path/to/index.js'].concat(additionalArgv);
  };

  it('オプションなしの場合、初期値が設定されること', () => {
    const argv = CliOption.get(createArgv([]));

    assert.strictEqual(argv.opts.author, ProjectOptionDef.default.author);
    assert.strictEqual(
      argv.opts.description,
      ProjectOptionDef.default.description
    );
    assert.strictEqual(argv.opts.license, ProjectOptionDef.default.license);
    assert.strictEqual(argv.opts.type, ProjectOptionDef.default.type);
  });

  it('不正な短いオプションが指定されたとき、エラーになること', () => {
    const argv = createArgv(['-z']);

    assert.throws(() => {
      CliOption.get(argv);
    }, Error);
  });

  it('不正な長いオプションが指定されたとき、エラーになること', () => {
    const argv = createArgv(['--foo']);

    assert.throws(() => {
      CliOption.get(argv);
    }, Error);
  });

  it('一つだけオプションが指定されたときに、指定の一つだけ設定されること', () => {
    const argv = createArgv(['-d', 'foo']);
    const actual = CliOption.get(argv);

    assert.strictEqual(actual.opts.author, ProjectOptionDef.default.author);
    assert.strictEqual(actual.opts.description, 'foo');
    assert.strictEqual(actual.opts.license, ProjectOptionDef.default.license);
    assert.strictEqual(actual.opts.type, ProjectOptionDef.default.type);
  });

  it('未定義のパラメーターが渡ってきたときに無視されること', () => {
    // fooは未定義のパラメーター
    const argv = createArgv(['hoge', '-d', 'foo']);
    const actual = CliOption.get(argv);

    assert.strictEqual(actual.opts.author, ProjectOptionDef.default.author);
    assert.strictEqual(actual.opts.description, 'foo');
    assert.strictEqual(actual.opts.license, ProjectOptionDef.default.license);
    assert.strictEqual(actual.opts.type, ProjectOptionDef.default.type);
  });

  it('全オプションが指定されたときにすべて指定されること', () => {
    const argv = createArgv([
      '-a',
      'foo',
      '-d',
      'sample desc',
      '-l',
      'gpl-3.0',
      '-t',
      'ts-cli',
    ]);
    const actual = CliOption.get(argv);

    assert.strictEqual(actual.opts.author, 'foo');
    assert.strictEqual(actual.opts.description, 'sample desc');
    assert.strictEqual(actual.opts.license, 'gpl-3.0');
    assert.strictEqual(actual.opts.type, 'ts-cli');
  });
});
