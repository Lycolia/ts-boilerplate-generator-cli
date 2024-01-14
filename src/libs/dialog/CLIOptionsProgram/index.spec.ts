import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert';
import { CLIOptionsProgram } from '.';
import { ProjectOptionDef } from '../../../models/ProjectOptions';
import { MyError } from '../../util/MyError';

describe('create', () => {
  afterEach(() => {
    process.argv.length = 0;
    process.argv.push('/path/to/node');
    process.argv.push('/path/to/index.js');
  });

  it('オプションなしの場合、初期値が設定されること', () => {
    const argv = CLIOptionsProgram.create();

    assert.strictEqual(argv.opts.author, ProjectOptionDef.default.author);
    assert.strictEqual(
      argv.opts.description,
      ProjectOptionDef.default.description
    );
    assert.strictEqual(argv.opts.license, ProjectOptionDef.default.license);
    assert.strictEqual(argv.opts.type, ProjectOptionDef.default.type);
  });

  it('不正な短いオプションが指定されたとき、エラーになること', () => {
    process.argv.push('-z');
    assert.throws(() => {
      CLIOptionsProgram.create();
    }, MyError);
  });

  it('不正な長いオプションが指定されたとき、エラーになること', () => {
    process.argv.push('--foo');
    assert.throws(() => {
      CLIOptionsProgram.create();
    }, MyError);
  });

  it('一つだけオプションが指定されたときに、指定の一つだけ設定されること', () => {
    // setup
    process.argv.push('-d');
    process.argv.push('foo');
    // testing
    const argv = CLIOptionsProgram.create();

    assert.strictEqual(argv.opts.author, ProjectOptionDef.default.author);
    assert.strictEqual(argv.opts.description, 'foo');
    assert.strictEqual(argv.opts.license, ProjectOptionDef.default.license);
    assert.strictEqual(argv.opts.type, ProjectOptionDef.default.type);
  });

  it('未定義のパラメーターが渡ってきたときに無視されること', () => {
    process.argv.push('hoge'); // 未定義のパラメーター
    process.argv.push('-d');
    process.argv.push('foo');

    const argv = CLIOptionsProgram.create();

    assert.strictEqual(argv.opts.author, ProjectOptionDef.default.author);
    assert.strictEqual(argv.opts.description, 'foo');
    assert.strictEqual(argv.opts.license, ProjectOptionDef.default.license);
    assert.strictEqual(argv.opts.type, ProjectOptionDef.default.type);
  });

  it('全オプションが指定されたときにすべて指定されること', () => {
    process.argv.push('-a');
    process.argv.push('foo');
    process.argv.push('-d');
    process.argv.push('sample desc');
    process.argv.push('-l');
    process.argv.push('gpl-3.0');
    process.argv.push('-t');
    process.argv.push('ts-cli');

    const argv = CLIOptionsProgram.create();

    assert.strictEqual(argv.opts.author, 'foo');
    assert.strictEqual(argv.opts.description, 'sample desc');
    assert.strictEqual(argv.opts.license, 'gpl-3.0');
    assert.strictEqual(argv.opts.type, 'ts-cli');
  });
});
