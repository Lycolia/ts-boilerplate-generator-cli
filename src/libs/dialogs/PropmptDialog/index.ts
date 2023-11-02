import prompts from 'prompts';
import { DialogInputOptions } from '../../../models/DialogInputOptions';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { ProjectOption } from '../../../models/ProjectOptions';
import { MyError } from '../../core/MyError';

/**
 * @throws {AppError}
 */
const prompt = async () => {
  return (await prompts(DialogInputOptions, {
    onCancel: () => {
      throw MyError.create(ErrorReasons.cancelledCreatePj);
    },
  })) as Promise<ProjectOption>;
};

export const PropmptDialog = {
  prompt,
};
