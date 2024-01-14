import { MyError } from '../../util/MyError';
import { MyLog } from '../../util/MyLog';

export namespace MyProgram {
  export const exit = (err: MyError) => {
    MyLog.error(err);

    process.exit(err.reason.code);
  };
}
