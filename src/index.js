#!/usr/bin/env node
// @ts-check

const { getProjectMeta } = require('./libs/initalizer');
const { createProject } = require('./libs/projectCreator');

const init = getProjectMeta();
createProject(init);
