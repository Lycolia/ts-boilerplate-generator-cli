import prompts from 'prompts';
import { ProjectOption } from '../../models/ProjectOptions';
import { DialogInputOptions } from '../../models/DialogInputOptions';
import { ErrorReasons } from '../../models/ExitReasons';
import { TsgException } from '../../models/TsgException';

/**
 * propmpt project generator dialog
 */
export const promptProjectGeneratorDialog = async () => {
  return (await prompts(DialogInputOptions, {
    onCancel: () => {
      throw new TsgException(ErrorReasons.cancelledCreatePj);
    },
  })) as Promise<ProjectOption>;
};
