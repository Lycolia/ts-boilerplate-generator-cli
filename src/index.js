#!/usr/bin/env node
//@ts-check

const { getProjectConfig } = require('./libs/initalizer');
const { createProject } = require('./libs/projectCreator');
const { exitCode } = require('./libs/exitCodes');
const { errorLog } = require('./libs/log');

getProjectConfig()
  .then((conf) => {
    createProject(conf);
  })
  .catch(() => {
    errorLog(exitCode.unmanagedException.subject);
    process.exit(exitCode.unmanagedException.code);
  });
