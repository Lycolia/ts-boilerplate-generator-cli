import { ErrorReason } from '../../../models/ErrorReasons/type';

export class MyError extends Error {
  public readonly error: unknown;
  public readonly reason: ErrorReason;

  /**
   *
   * @param reason
   * @param error
   */
  constructor(reason: ErrorReason, error?: unknown) {
    super(reason.message);
    this.error = error;
    this.reason = reason;
  }
}
