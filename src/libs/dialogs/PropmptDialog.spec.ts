import prompts from 'prompts';
import { promptProjectGeneratorDialog } from './PropmptDialog';
import { ProjectOption, ProjectOptionDef } from '../../models/ProjectOptions';

const testCtx: ProjectOption = {
  author: 'qaz',
  description: '2wsxc',
  license: 'AGPL-3.0-or-later',
  projectName: '3edc4rfv',
  type: 'ts-react',
};

describe('promptProjectGeneratorDialog', () => {
  it('inputed blank all', async () => {
    prompts.inject([undefined, undefined, undefined, undefined, undefined]);
    const result = await promptProjectGeneratorDialog();
    expect(result).toEqual(ProjectOptionDef.default);
  });

  it('inputed all', async () => {
    prompts.inject([
      testCtx.type,
      testCtx.projectName,
      testCtx.description,
      testCtx.author,
      testCtx.license,
    ]);
    const result = await promptProjectGeneratorDialog();
    expect(result).toEqual(testCtx);
  });
});
