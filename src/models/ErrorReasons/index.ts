export const ErrorReasons = {
  ok: { code: 0, subject: 'OK', message: 'OK' },
  unmanagedException: {
    code: 1,
    message: 'unmanaged exception has occurred',
  },
  invalidAuthorOptions: {
    code: 10,
    message: '-a, --author option should be specified as a string',
  },
  invalidDescriptionOptions: {
    code: 11,
    message: '-d, --description option should be specified as a string',
  },
  invalidLicenseOptions: {
    code: 12,
    message: '-l, --license option should be specified as a string',
  },
  invalidProjectNameOptions: {
    code: 13,
    message: '-p, --project-name option should be specified as a string',
  },
  invalidTypeOptions: {
    code: 14,
    message: '-t, --type option should be specified as a string',
  },
  gitNotFound: {
    code: 100,
    message: 'Git not found\nshould install Git or export Git path',
  },
  gitNotConfigure: {
    code: 101,
    message: 'Git not configure\nshould configure Git user.name and user.email',
  },
  cdNotExists: {
    code: 102,
    message:
      'Current directory may does not exist\nbe retry in existing directory',
  },
  existsDestPath: {
    code: 103,
    message:
      'Project directory already exists\nplease specify another project name',
  },
  mvCmdFail: {
    code: 104,
    message: 'failed create project directory',
  },
  failPull: {
    code: 105,
    message: 'failed git pull from boilerplate repository',
  },
  cancelledCreatePj: {
    code: 106,
    message: 'Cancelled project creation by user\nbe retry create project',
  },
  failNpmInst: {
    code: 107,
    message: 'failed npm install',
  },
} as const;
