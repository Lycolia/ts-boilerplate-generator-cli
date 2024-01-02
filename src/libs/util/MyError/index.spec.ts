import { after, before, beforeEach, afterEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { MyError } from '.';

describe('constructor', () => {
  it('生成されるオブジェクトの構造が正しいこと', () => {
    const actual = new MyError({ code: 123, message: 'foo' }, 123);

    // エラーを継承していること
    assert.ok(actual instanceof Error);
    // プロパティに正しく設定されていること
    assert.deepStrictEqual(actual.error, 123);
    assert.deepStrictEqual(actual.message, 'foo');
  });
});
