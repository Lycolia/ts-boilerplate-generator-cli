import prompts from 'prompts';
import { DialogInputOptions } from '../../../models/DialogInputOptions';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { ProjectOption } from '../../../models/ProjectOptions';
import { MyError } from '../../util/MyError';

export namespace PropmptDialog {
  /**
   * @throws {AppError}
   */
  export const prompt = async () => {
    return (await prompts(DialogInputOptions, {
      onCancel: () => {
        throw new MyError(ErrorReasons.cancelledCreatePj);
      },
    })) as Promise<ProjectOption>;
  };
}
