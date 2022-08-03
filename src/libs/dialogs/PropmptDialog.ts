import prompts from 'prompts';
import { ProjectOption } from '../../models/ProjectOptions';
import { DialogInputOptions } from '../../models/DialogInputOptions';
import { ErrorReasons, createError } from '../../models/ErrorReasons';

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
