#!/usr/bin/env node

// const { getProjectConfig } = require('./libs/initalizer');
// const { createProject } = require('./libs/projectCreator');
// const { exitCode } = require('./libs/exitCodes');
// const { errorLog } = require('./libs/log');
// const { getArgs } = require('./libs/argument');

import { createCLIOptionsProgram } from './libs/createCLIOptionsProgram';

const a = createCLIOptionsProgram();
console.log(a);

// getProjectConfig()
//   .then((conf) => {
//     createProject(conf);
//   })
//   .catch(() => {
//     errorLog(exitCode.unmanagedException.subject);
//     process.exit(exitCode.unmanagedException.code);
//   });
