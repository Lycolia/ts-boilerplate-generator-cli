import { infoLog, warnLog, errorLog } from '../Log';

describe('infoLog', () => {
  it('function can work', () => {
    const spyedInfo = jest.spyOn(console, 'info');
    infoLog({ test: 'foo', hoge: 'bar' });
    expect(spyedInfo.mock.calls[0][2]).toEqual({
      test: 'foo',
      hoge: 'bar',
    });
  });
});

describe('warnLog', () => {
  it('function can work', () => {
    const spyedWarn = jest.spyOn(console, 'warn');
    warnLog({ test: 'foo', hoge: 'bar' });
    expect(spyedWarn.mock.calls[0][2]).toEqual({
      test: 'foo',
      hoge: 'bar',
    });
  });
});

describe('errorLog', () => {
  it('function can work', () => {
    const spyedError = jest.spyOn(console, 'error');
    errorLog({ test: 'foo', hoge: 'bar' });
    expect(spyedError.mock.calls[0][2]).toEqual({
      test: 'foo',
      hoge: 'bar',
    });
  });
});
