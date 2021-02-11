#!/usr/bin/env node

import { createCLIOptionsProgram } from './libs/dialogs/CreateCLIOptionsProgram';
import { promptProjectGeneratorDialog } from './libs/dialogs/PropmptDialog';
import { createProject } from './libs/ProjectCreator';
import { ProjectOption } from './models/ProjectOptions';

const getProjectOptions = async (): Promise<ProjectOption> => {
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
  .catch((e) => {
    console.error(e);
  });
