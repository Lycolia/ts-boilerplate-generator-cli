import { deepStrictEqual, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';
import { MyError } from 'src/libs/core/MyError';

describe('create', () => {
  it('only reason', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = MyError.create(param);
    deepStrictEqual(actual, {
      reason: {
        ...param,
      },
      error: undefined,
    });
  });

  it('reason with error', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const err = new Error('foo');
    const actual = MyError.create(param, err);
    deepStrictEqual(actual, {
      reason: {
        ...param,
      },
      error: err,
    });
  });
});

describe('hasError', () => {
  it('has error', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = MyError.hasError(MyError.create(param));
    strictEqual(actual, true);
  });

  it('has not error', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = MyError.hasError(param);
    strictEqual(actual, false);
  });
});
