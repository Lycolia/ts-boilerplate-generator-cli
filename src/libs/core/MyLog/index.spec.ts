import { MyLog } from '.';

describe('info', () => {
  it('function can work', () => {
    const spyedInfo = jest.spyOn(console, 'info');
    MyLog.info({ test: 'foo', hoge: 'bar' });
    expect(spyedInfo.mock.calls[0][2]).toEqual({
      test: 'foo',
      hoge: 'bar',
    });
  });
});

describe('warn', () => {
  it('function can work', () => {
    const spyedWarn = jest.spyOn(console, 'warn');
    MyLog.warn({ test: 'foo', hoge: 'bar' });
    expect(spyedWarn.mock.calls[0][2]).toEqual({
      test: 'foo',
      hoge: 'bar',
    });
  });
});

describe('error', () => {
  it('function can work', () => {
    const spyedError = jest.spyOn(console, 'error');
    MyLog.error({ test: 'foo', hoge: 'bar' });
    expect(spyedError.mock.calls[0][2]).toEqual({
      test: 'foo',
      hoge: 'bar',
    });
  });
});
