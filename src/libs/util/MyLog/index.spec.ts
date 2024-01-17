import { MyLog } from '.';

describe('info', () => {
  it('console.log()が引数の回数分、呼ばれ、引数が渡っていること', () => {
    const mockedInfo = jest.spyOn(console, 'info').mockImplementation();
    MyLog.info({ test: 'foo', hoge: 'bar' }, 'test');
    expect(mockedInfo.mock.calls[0][2]).toStrictEqual({
      test: 'foo',
      hoge: 'bar',
    });
    expect(mockedInfo.mock.calls[1][2]).toBe('test');
  });
});

describe('warn', () => {
  it('console.warn()が引数の回数分、呼ばれ、引数が渡っていること', () => {
    const mockedWarn = jest.spyOn(console, 'warn').mockImplementation();
    MyLog.warn({ test: 'foo', hoge: 'bar' }, 'test');
    expect(mockedWarn.mock.calls[0][2]).toStrictEqual({
      test: 'foo',
      hoge: 'bar',
    });
    expect(mockedWarn.mock.calls[1][2]).toBe('test');
  });
});

describe('error', () => {
  it('console.error()が引数の回数分、呼ばれ、引数が渡っていること', () => {
    const mockedError = jest.spyOn(console, 'error').mockImplementation();
    MyLog.error({ test: 'foo', hoge: 'bar' }, 'test');
    expect(mockedError.mock.calls[0][2]).toStrictEqual({
      test: 'foo',
      hoge: 'bar',
    });
    expect(mockedError.mock.calls[1][2]).toBe('test');
  });
});
