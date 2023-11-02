import { MyError } from '.';

describe('constructor', () => {
  it('生成されるオブジェクトの構造が正しいこと', () => {
    const actual = new MyError('foo', 123);

    // エラーを継承していること
    expect(actual).toBeInstanceOf(Error);
    // プロパティに正しく設定されていること
    expect(actual.message).toBe('foo');
    expect(actual.error).toBe(123);
  });
});
