#!/usr/bin/env node

import { MyError } from './libs/util/MyError';
import { ProjectCreator } from './libs/util/ProjectCreator';
import { CLIOptionsProgram } from './libs/dialog/CLIOptionsProgram';
import { PropmptDialog } from './libs/dialog/PropmptDialog';
import { MyProgram } from './libs/system/MyProgram';
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

    if (err instanceof MyError) {
      MyProgram.exit(err);
    }
  })
  .catch((error) => {
    MyProgram.exit(new MyError(ErrorReasons.unmanagedException, error));
  });
