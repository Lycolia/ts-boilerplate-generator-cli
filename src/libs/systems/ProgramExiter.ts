import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';
import { errorLog } from '../Log';

/**
 * exit this app
 * @param error this app Exception
 */
export const exitApp = (error: TsgException | unknown) => {
  if (error instanceof TsgException) {
    exitProgram(error as TsgException);
  } else {
    exitProgram(new TsgException(ErrorReasons.unmanagedException, error));
  }
};

/**
 * exit this program
 * @param tsgEx exception
 */
export const exitProgram = (tsgEx: TsgException) => {
  errorLog(tsgEx.reason.subject);
  if (tsgEx.reason.message !== undefined) {
    errorLog(tsgEx.reason.message);
  }
  if (tsgEx.error !== undefined) {
    errorLog(tsgEx.error);
  }

  process.exit(tsgEx.reason.code);
};
