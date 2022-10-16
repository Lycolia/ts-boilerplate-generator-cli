import { ProjectOptionDef } from 'src/models/ProjectOptions';
import { CLIOptionsProgram as CCOP } from '.';

/**
 * every time after it
 */
afterEach(() => {
  // cleanup argv
  process.argv.length = 2;
});

describe('create', () => {
  it('no options', () => {
    // testing
    const argv = CCOP.create();
    expect(argv.author).toBe(ProjectOptionDef.default.author);
    expect(argv.description).toBe(ProjectOptionDef.default.description);
    expect(argv.license).toBe(ProjectOptionDef.default.license);
    expect(argv.type).toBe(ProjectOptionDef.default.type);
    expect(argv.useGenerator).toBe(true);
  });

  it('unknown arguments', () => {
    // setup
    process.argv.push('foo');
    // testing
    const argv = CCOP.create();
    expect(argv.author).toBe(ProjectOptionDef.default.author);
    expect(argv.description).toBe(ProjectOptionDef.default.description);
    expect(argv.license).toBe(ProjectOptionDef.default.license);
    expect(argv.type).toBe(ProjectOptionDef.default.type);
    expect(argv.useGenerator).toBe(true);
  });

  it('single defined arguments', () => {
    // setup
    process.argv.push('-d');
    process.argv.push('foo');
    // testing
    const argv = CCOP.create();
    expect(argv.author).toBe(ProjectOptionDef.default.author);
    expect(argv.description).toBe('foo');
    expect(argv.license).toBe(ProjectOptionDef.default.license);
    expect(argv.type).toBe(ProjectOptionDef.default.type);
    expect(argv.useGenerator).toBe(false);
  });

  it('defined options and unknown arguments', () => {
    // setup
    process.argv.push('hoge');
    process.argv.push('-d');
    process.argv.push('foo');
    // testing
    const argv = CCOP.create();
    expect(argv.author).toBe(ProjectOptionDef.default.author);
    expect(argv.description).toBe('foo');
    expect(argv.license).toBe(ProjectOptionDef.default.license);
    expect(argv.type).toBe(ProjectOptionDef.default.type);
    expect(argv.useGenerator).toBe(false);
  });

  it('defined all options', () => {
    // setup
    process.argv.push('-a');
    process.argv.push('foo');
    process.argv.push('-d');
    process.argv.push('sample desc');
    process.argv.push('-l');
    process.argv.push('gpl-3.0');
    process.argv.push('-t');
    process.argv.push('ts-cli');
    // testing
    const argv = CCOP.create();
    expect(argv.author).toBe('foo');
    expect(argv.description).toBe('sample desc');
    expect(argv.license).toBe('gpl-3.0');
    expect(argv.type).toBe('ts-cli');
    expect(argv.useGenerator).toBe(false);
  });
});
