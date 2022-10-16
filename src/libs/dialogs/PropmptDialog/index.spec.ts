import prompts from 'prompts';
import { PropmptDialog } from '.';
import { ProjectOption, ProjectOptionDef } from 'src/models/ProjectOptions';

const testCtx: ProjectOption = {
  author: 'qaz',
  description: '2wsxc',
  license: 'AGPL-3.0-or-later',
  projectName: '3edc4rfv',
  type: 'ts-react',
};

describe('prompt', () => {
  it('inputed blank all', async () => {
    prompts.inject([undefined, undefined, undefined, undefined, undefined]);
    const result = await PropmptDialog.prompt();
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
    const result = await PropmptDialog.prompt();
    expect(result).toEqual(testCtx);
  });
});
