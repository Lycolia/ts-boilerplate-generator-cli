import { errorLog } from '../../core/Log';

/**
 * exit this app
 */
export const exitApp = (err: AppError) => {
  const { reason, error } = err;
  errorLog(reason.subject);
  if (reason.message !== undefined) {
    errorLog(reason.message);
  }
  if (error !== undefined) {
    errorLog(error);
  }

  process.exit(reason.code);
};