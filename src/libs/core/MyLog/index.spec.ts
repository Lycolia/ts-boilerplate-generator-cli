import { deepStrictEqual } from 'node:assert';
import { describe, it, mock } from 'node:test';
import { MyLog } from '.';

describe('info', () => {
  it('console.log()が引数の回数分、呼ばれ、引数が渡っていること', () => {
    const mockedInfo = mock.method(console, 'info');
    MyLog.info({ test: 'foo', hoge: 'bar' }, 'test');
    deepStrictEqual(mockedInfo.mock.calls[0].arguments[2], {
      test: 'foo',
      hoge: 'bar',
    });
    deepStrictEqual(mockedInfo.mock.calls[1].arguments[2], 'test');
  });
});

describe('warn', () => {
  it('console.warn()が引数の回数分、呼ばれ、引数が渡っていること', () => {
    const mockedWarn = mock.method(console, 'warn');
    MyLog.warn({ test: 'foo', hoge: 'bar' }, 'test');
    deepStrictEqual(mockedWarn.mock.calls[0].arguments[2], {
      test: 'foo',
      hoge: 'bar',
    });
    deepStrictEqual(mockedWarn.mock.calls[1].arguments[2], 'test');
  });
});

describe('error', () => {
  it('console.error()が引数の回数分、呼ばれ、引数が渡っていること', () => {
    const mockedError = mock.method(console, 'error');
    MyLog.error({ test: 'foo', hoge: 'bar' }, 'test');
    deepStrictEqual(mockedError.mock.calls[0].arguments[2], {
      test: 'foo',
      hoge: 'bar',
    });
    deepStrictEqual(mockedError.mock.calls[1].arguments[2], 'test');
  });
});
