exports.exitCode = {
  ok: { code: 0, subject: 'OK', message: 'OK' },
  cancelledCreatePj: {
    code: 1,
    subject: 'Project creation cancelled',
    message: 'Be retry create project',
  },
  cdNotExists: {
    code: 2,
    subject: 'Current directory may does not exist',
    message: 'Be retry in existing directory',
  },
  existsDistPath: {
    code: 3,
    subject: 'Project directory already exists',
    message: 'Please specify another project name',
  },
  invalidArg: {
    code: 4,
    subject: 'Invalid argument',
    message: 'usage: tsg [project-name]',
  },
  failPull: {
    code: 5,
    subject: 'Failure pull repository',
    message: '',
  },
  failCreatePj: {
    code: 6,
    subject: 'Failure create project',
    message: '',
  },
  unmanagedException: {
    code: 999,
    subject: 'Unmanaged exception has occurred',
    message: '',
  },
};
