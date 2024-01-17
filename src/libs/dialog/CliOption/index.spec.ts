import { CliOption } from '.';
import { ProjectOptionDef } from '../../../models/ProjectOptions';

describe('get', () => {
  const createArgv = (additionalArgv: string[]) => {
    return ['/path/to/node', '/path/to/index.js'].concat(additionalArgv);
  };

  it('オプションなしの場合、初期値が設定されること', () => {
    const argv = CliOption.get(createArgv([]));

    expect(argv.opts.author).toBe(ProjectOptionDef.default.author);
    expect(argv.opts.description).toBe(ProjectOptionDef.default.description);
    expect(argv.opts.license).toBe(ProjectOptionDef.default.license);
    expect(argv.opts.type).toBe(ProjectOptionDef.default.type);
  });

  it('不正な短いオプションが指定されたとき、エラーになること', () => {
    const argv = createArgv(['-z']);

    expect(() => {
      CliOption.get(argv);
    }).toThrow();
  });

  it('不正な長いオプションが指定されたとき、エラーになること', () => {
    const argv = createArgv(['--foo']);

    expect(() => {
      CliOption.get(argv);
    }).toThrow();
  });

  it('一つだけオプションが指定されたときに、指定の一つだけ設定されること', () => {
    const argv = createArgv(['-d', 'foo']);
    const actual = CliOption.get(argv);

    expect(actual.opts.author).toBe(ProjectOptionDef.default.author);
    expect(actual.opts.description).toBe('foo');
    expect(actual.opts.license).toBe(ProjectOptionDef.default.license);
    expect(actual.opts.type).toBe(ProjectOptionDef.default.type);
  });

  it('未定義のパラメーターが渡ってきたときに無視されること', () => {
    // fooは未定義のパラメーター
    const argv = createArgv(['hoge', '-d', 'foo']);
    const actual = CliOption.get(argv);

    expect(actual.opts.author).toBe(ProjectOptionDef.default.author);
    expect(actual.opts.description).toBe('foo');
    expect(actual.opts.license).toBe(ProjectOptionDef.default.license);
    expect(actual.opts.type).toBe(ProjectOptionDef.default.type);
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

    expect(actual.opts.author).toBe('foo');
    expect(actual.opts.description).toBe('sample desc');
    expect(actual.opts.license).toBe('gpl-3.0');
    expect(actual.opts.type).toBe('ts-cli');
  });
});
