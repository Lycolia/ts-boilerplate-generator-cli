import { createCLIOptionsProgram } from './createCLIOptionsProgram';

describe('argumentParser', () => {
  afterAll(() => {
    // cleanup argv
    process.argv.length = 2;
  });
  it('no arguments', () => {
    const argv = createCLIOptionsProgram();
    expect(argv.author).toBe('unknown');
    expect(argv.description).toBe('no description');
    expect(argv.license).toBe('MIT');
    expect(argv.type).toBe('vanilla');
    expect(argv.yeoman).toBe(false);
  });

  it('all option', () => {
    process.argv.push('-a');
    process.argv.push('foo');
    process.argv.push('-d');
    process.argv.push('sample desc');
    process.argv.push('-l');
    process.argv.push('gpl-3.0');
    process.argv.push('-t');
    process.argv.push('react-ts');
    process.argv.push('-y');
    const argv = createCLIOptionsProgram();
    expect(argv.author).toBe('foo');
    expect(argv.description).toBe('sample desc');
    expect(argv.license).toBe('gpl-3.0');
    expect(argv.type).toBe('react-ts');
    expect(argv.yeoman).toBe(true);
  });
});
