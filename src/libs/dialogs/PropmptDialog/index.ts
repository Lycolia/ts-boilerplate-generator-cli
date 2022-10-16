import prompts from 'prompts';
import { ProjectOption } from 'src/models/ProjectOptions';
import { DialogInputOptions } from 'src/models/DialogInputOptions';
import { ErrorReasons } from 'src/models/ErrorReasons';
import { MyError } from 'src/libs/core/MyError';

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
