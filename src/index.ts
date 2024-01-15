#!/usr/bin/env node

import { MyError } from './libs/util/MyError';
import { ProjectCreator } from './libs/util/ProjectCreator';
import { CliOption } from './libs/dialog/CliOption';
import { PropmptDialog } from './libs/dialog/PropmptDialog';
import { MyProgram } from './libs/system/MyProgram';
import { ErrorReasons } from './models/ErrorReasons';

export const getProjectOptions = async (argv: string[]) => {
  const srcCmdOpts = CliOption.get(argv);
  const cmdOpts = CliOption.parse(srcCmdOpts);

  return cmdOpts.hasCommandLineOptions
    ? {
        author: cmdOpts.author,
        description: cmdOpts.description,
        license: cmdOpts.license,
        projectName: cmdOpts.projectName,
        type: cmdOpts.type,
      }
    : await PropmptDialog.prompt();
};

getProjectOptions(process.argv)
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
