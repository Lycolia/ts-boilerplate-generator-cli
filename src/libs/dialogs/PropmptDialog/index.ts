import prompts from 'prompts';
import { ProjectOption } from 'src/models/ProjectOptions';
import { DialogInputOptions } from 'src/models/DialogInputOptions';
import { ErrorReasons, createError } from 'src/models/ErrorReasons';

/**
 * @throws {AppError}
 */
export const promptProjectGeneratorDialog = async () => {
  return (await prompts(DialogInputOptions, {
    onCancel: () => {
      throw createError(ErrorReasons.cancelledCreatePj);
    },
  })) as Promise<ProjectOption>;
};
