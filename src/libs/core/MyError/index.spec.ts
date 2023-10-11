import { MyError } from '.';

describe('create', () => {
  it('only reason', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = MyError.create(param);
    expect(actual).toStrictEqual({
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
    expect(actual).toStrictEqual({
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
    expect(actual).toBe(true);
  });

  it('has not error', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = MyError.hasError(param);
    expect(actual).toBe(false);
  });
});
