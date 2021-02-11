import { TsgException } from '../../models/TsgException';
import { errorLog } from '../Log';

/**
 * exit this app
 * @param tsgex this app Exception
 * @param error error
 */
export const exitProgram = (tsgex: TsgException, error?: unknown) => {
  errorLog(tsgex.reason.subject);
  if (tsgex.reason.message !== undefined) {
    errorLog(tsgex.reason.message);
  }
  if (error !== undefined) {
    errorLog(error);
  }

  process.exit(tsgex.reason.code);
};
