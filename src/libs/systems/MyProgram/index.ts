import { AppError } from '../../../models/ErrorReasons/type';
import { MyLog } from '../../core/MyLog';

export namespace MyProgram {
  export const exit = (err: AppError) => {
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
}
