#!/usr/bin/env node

import { CLIOptionsProgram } from 'src/libs/dialogs/CLIOptionsProgram';
import { PropmptDialog } from 'src/libs/dialogs/PropmptDialog';
import { ProjectCreator } from 'src/libs/core/ProjectCreator';
import { exitApp } from 'src/libs/systems/ProgramExiter';
import { ErrorReasons } from 'src/models/ErrorReasons';
import { ProjectOption } from 'src/models/ProjectOptions';
import { MyError } from 'src/libs/core/MyError';

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
    const err = MyError.hasError(ProjectCreator.createProject(options));

    if (MyError.hasError(err)) {
      exitApp(err);
    }
  })
  .catch((error) => {
    exitApp(MyError.create(ErrorReasons.unmanagedException, error));
  });
