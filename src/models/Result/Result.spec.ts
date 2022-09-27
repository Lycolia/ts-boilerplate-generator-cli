import { CommonResult } from './Result';

describe('createResult', () => {
  it('Expect has error object by got has error object', () => {
    const appError = {
      hasError: true,
      payload: {
        reason: {
          code: 0,
          subject: 'foo',
          message: 'bar',
        },
      },
    };
    const actual = CommonResult.createResult(appError);

    expect(actual.hasError).toBe(true);
    expect(actual.payload).toStrictEqual(appError.payload);
  });

  it('Expect has not error object by got has not error object', () => {
    const appError = {
      hasError: false,
      payload: {
        reason: {
          code: 0,
          subject: 'foo',
          message: 'bar',
        },
      },
    };
    const actual = CommonResult.createResult(appError);

    expect(actual.hasError).toBe(false);
    expect(actual.payload).toStrictEqual(appError.payload);
  });
});
