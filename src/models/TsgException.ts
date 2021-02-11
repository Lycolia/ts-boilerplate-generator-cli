import { ErrorReason } from './ExitReasons';

/**
 * Exception
 */
export class TsgException {
  /**
   *
   * @param reason exit reason
   * @param error unmaneged error
   */
  public constructor(public reason: ErrorReason, public error?: unknown) {}
}
