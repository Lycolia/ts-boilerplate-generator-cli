import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { MyProgram } from '.';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

describe('exit', () => {
  // exitが実際に走って落ちるのでmock.methodの第三引数を指定している
  const mockedExit = mock.method(process, 'exit', () => {});

  it('call exit', () => {
    MyProgram.exit(new MyError(ErrorReasons.unmanagedException));

    assert.strictEqual(mockedExit.mock.calls.length, 1);
  });
});
