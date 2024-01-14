import util from 'node:util';
import { ErrorReason } from '../../../models/ErrorReasons/type';

export class MyError extends Error {
  public readonly reason: ErrorReason;

  /**
   *
   * @param reason
   * @param cause
   */
  constructor(reason: ErrorReason, cause?: unknown) {
    super(reason.message);
    this.name = 'MyError';
    this.cause = cause;

    this.reason = reason;
  }

  public toString() {
    // 本来デバッグ用の機能だが、このプログラムがツールであるという特性上、使用することに対する支障はないと考える
    return util.inspect(this);
  }
}
