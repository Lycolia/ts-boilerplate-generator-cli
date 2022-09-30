#!/usr/bin/env node

import { createCLIOptionsProgram } from 'src/libs/dialogs/CreateCLIOptionsProgram';
import { promptProjectGeneratorDialog } from 'src/libs/dialogs/PropmptDialog';
import { createProject } from 'src/libs/core/ProjectCreator';
import { exitApp } from 'src/libs/systems/ProgramExiter';
import { ErrorReasons, createError } from 'src/models/ErrorReasons';
import { ProjectOption } from 'src/models/ProjectOptions';

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
    exitApp(createError(ErrorReasons.unmanagedException, error));
  });
