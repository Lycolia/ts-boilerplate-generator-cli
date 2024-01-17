import { MyError } from '.';

describe('constructor', () => {
  it('生成されるオブジェクトの構造が正しいこと', () => {
    const actual = new MyError({ code: 123, message: 'foo' }, 123);

    // エラーを継承していること
    expect(actual).toBeInstanceOf(Error);
    // プロパティに正しく設定されていること
    expect(actual.cause).toBe(123);
    expect(actual.reason).toStrictEqual({
      code: 123,
      message: 'foo',
    });
  });

  it('エラーオブジェクトの中身が文字列展開されること', () => {
    const actual = new MyError({ code: 123, message: 'foo' }, 123);

    expect(`${actual}`).toMatch(
      /MyError: foo\n +?at .+?\.<anonymous>[\s\S]+reason[\s\S]+code.+/
    );
  });
});
