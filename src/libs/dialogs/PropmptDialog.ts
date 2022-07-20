import prompts from 'prompts';
import { ProjectOption } from '../../models/ProjectOptions';
import { DialogInputOptions } from '../../models/DialogInputOptions';
import { ErrorReasons, reportError } from '../../models/ErrorReasons';

/**
 * @throws {AppError}
 */
export const promptProjectGeneratorDialog = async () => {
  return (await prompts(DialogInputOptions, {
    onCancel: () => {
      throw reportError(ErrorReasons.cancelledCreatePj);
    },
  })) as Promise<ProjectOption>;
};
