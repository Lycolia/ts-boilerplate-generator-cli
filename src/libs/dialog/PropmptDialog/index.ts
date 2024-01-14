import prompts from 'prompts';
import { DialogInputOptions } from '../../../models/DialogInputOptions';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { ProjectOption } from '../../../models/ProjectOptions';
import { MyError } from '../../util/MyError';

export namespace PropmptDialog {
  /**
   * @throws {AppError}
   */
  export const prompt = async (): Promise<ProjectOption> => {
    const result = await prompts(DialogInputOptions, {
      onCancel: () => {
        throw new MyError(ErrorReasons.cancelledCreatePj);
      },
    });

    // prompts.Answers<string>は辞書
    // 型の担保はテストでやる
    return {
      author: result.author,
      description: result.description,
      license: result.license,
      projectName: result.projectName,
      type: result.type,
    };
  };
}
