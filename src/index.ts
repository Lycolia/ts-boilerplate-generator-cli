#!/usr/bin/env node

import { createCLIOptionsProgram } from './libs/dialogs/CreateCLIOptionsProgram';
import { promptProjectGeneratorDialog } from './libs/dialogs/PropmptDialog';
import { createProject } from './libs/ProjectCreator';
import { exitProgram } from './libs/systems/ProgramExiter';
import { ErrorReasons } from './models/ExitReasons';
import { ProjectOption } from './models/ProjectOptions';
import { TsgException } from './models/TsgException';

/**
 * get project options (argument | dialog)
 */
export const getProjectOptions = async (): Promise<ProjectOption> => {
  const opts = createCLIOptionsProgram();

  return opts.useGenerator
    ? await promptProjectGeneratorDialog()
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
    createProject(options);
  })
  .catch((error) => {
    if (typeof error === TsgException.toString()) {
      exitProgram(error);
    }
    exitProgram(new TsgException(ErrorReasons.unmanagedException), error);
  });
