import { MyLog } from 'src/libs/core/MyLog';
import { AppError } from 'src/models/ErrorReasons/type';

/**
 * exit this app
 */
export const exitApp = (err: AppError) => {
  const { reason, error } = err;
  MyLog.error(reason.subject);
  if (reason.message !== undefined) {
    MyLog.error(reason.message);
  }
  if (error !== undefined) {
    MyLog.error(error);
  }

  process.exit(reason.code);
};
