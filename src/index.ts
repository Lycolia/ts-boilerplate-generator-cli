#!/usr/bin/env node

import { MyError } from './libs/util/MyError';
import { ProjectCreator } from './libs/util/ProjectCreator';
import { CLIOptionsProgram } from './libs/dialog/CLIOptionsProgram';
import { PropmptDialog } from './libs/dialog/PropmptDialog';
import { MyProgram } from './libs/system/MyProgram';
import { ErrorReasons } from './models/ErrorReasons';

export const getProjectOptions = async () => {
  const srcCmdOpts = CLIOptionsProgram.create();
  const cmdOpts = CLIOptionsProgram.parseOpts(srcCmdOpts);

  return cmdOpts.hasCommandlineOptions
    ? {
        author: cmdOpts.author,
        description: cmdOpts.description,
        license: cmdOpts.license,
        projectName: cmdOpts.projectName,
        type: cmdOpts.type,
      }
    : await PropmptDialog.prompt();
};

getProjectOptions()
  .then((options) => {
    if (options instanceof MyError) {
      MyProgram.exit(options);
    } else {
      ProjectCreator.createProject(options);
    }
  })
  .catch((error) => {
    // 全てのエラーはここに飛ばして落とす
    if (error instanceof MyError) {
      MyProgram.exit(error);
    } else {
      MyProgram.exit(new MyError(ErrorReasons.unmanagedException, error));
    }
  });
