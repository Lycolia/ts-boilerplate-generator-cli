#!/usr/bin/env node

import { createCLIOptionsProgram } from './libs/dialogs/CreateCLIOptionsProgram';
import { promptProjectGeneratorDialog } from './libs/dialogs/PropmptDialog';
import { createProject } from './libs/ProjectCreator';
import { exitApp } from './libs/systems/ProgramExiter';
import { ErrorReasons, reportError } from './models/ErrorReasons';
import { ProjectOption } from './models/ProjectOptions';

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
    exitApp(reportError(ErrorReasons.unmanagedException, error));
  });
