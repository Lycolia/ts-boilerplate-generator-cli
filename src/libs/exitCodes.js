exports.exitCode = {
  ok: { code: 0, subject: 'OK', message: 'OK' },
  cdNotExists: {
    code: 1,
    subject: 'Current directory may does not exist',
    message: 'Be retry in existing directory',
  },
  existsDistPath: {
    code: 2,
    subject: 'Project directory already exists',
    message: 'Please specify another project name',
  },
  invalidArg: {
    code: 3,
    subject: 'Invalid argument',
    message: 'usage: tsg [project-name]',
  },
  failPull: {
    code: 4,
    subject: 'Failure pull repository.',
    message: '',
  },
  failCreatePj: {
    code: 5,
    subject: 'Failure create project.',
    message: '',
  },
};
