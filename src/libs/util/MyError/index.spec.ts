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

describe('test', () => {
  before(() => {
    console.log('before');
  });
  beforeEach(() => {
    console.log('beforeEach');
  });
  afterEach(() => {
    console.log('afterEach');
  });
  after(() => {
    console.log('after');
  });

  it('test 1', () => {
    assert.strictEqual(1, 1);
  });
  it('test 2', () => {
    assert.strictEqual(2, 2);
  });
  it('test 3', () => {
    assert.strictEqual(3, 3);
  });
});
