#!/usr/bin/env node

import { MyError } from './libs/core/MyError';
import { ProjectCreator } from './libs/core/ProjectCreator';
import { CLIOptionsProgram } from './libs/dialogs/CLIOptionsProgram';
import { PropmptDialog } from './libs/dialogs/PropmptDialog';
import { ProgramExiter } from './libs/systems/ProgramExiter';
import { ErrorReasons } from './models/ErrorReasons';
import { ProjectOption } from './models/ProjectOptions';

/**
 * get project options (argument | dialog)
 */
export const getProjectOptions = async (): Promise<ProjectOption> => {
  const opts = CLIOptionsProgram.create();

  return opts.useGenerator
    ? await PropmptDialog.prompt()
    : {
        author: opts.author,
        description: opts.description,
        license: opts.license,
        projectName: opts.projectName,
        type: opts.type,
      };
};

getProjectOptions()
  .then((options) => {
    const err = ProjectCreator.createProject(options);

    if (MyError.hasError(err)) {
      ProgramExiter.exit(err);
    }
  })
  .catch((error) => {
    ProgramExiter.exit(MyError.create(ErrorReasons.unmanagedException, error));
  });
