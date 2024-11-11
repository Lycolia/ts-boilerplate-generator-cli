import prompts from 'prompts';
import { PropmptDialog } from '.';
import {
  ProjectOption,
  ProjectOptionDef
} from '../../../models/ProjectOptions';

const testCtx: ProjectOption = {
  author: 'qaz',
  description: '2wsxc',
  license: 'AGPL-3.0-or-later',
  projectName: '3edc4rfv',
  type: 'ts-cli'
};

describe('prompt', () => {
  it('対話モードで全て空入力の場合、デフォルトがセットされること', async () => {
    // 疑似的に対話モードを再現している
    prompts.inject([undefined, undefined, undefined, undefined, undefined]);
    const actual = await PropmptDialog.prompt();
    expect(actual).toStrictEqual(ProjectOptionDef.default);
  });

  it('対話モードで全て入力があった場合、入力値が入ること', async () => {
    // 疑似的に対話モードを再現している
    prompts.inject([
      testCtx.type,
      testCtx.projectName,
      testCtx.description,
      testCtx.author,
      testCtx.license
    ]);
    const actual = await PropmptDialog.prompt();
    expect(actual).toStrictEqual(testCtx);
  });
});
