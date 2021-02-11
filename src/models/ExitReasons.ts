// app error reson
export type ErrorReason = {
  code: number;
  subject: string;
  message?: string;
};

/**
 * app error resons
 */
export const ErrorReasons = {
  ok: { code: 0, subject: 'OK', message: 'OK' } as ErrorReason,
  gitNotFound: {
    code: 1,
    subject: 'Git not found',
    message: 'should install Git or export Git path',
  } as ErrorReason,
  cdNotExists: {
    code: 100,
    subject: 'Current directory may does not exist',
    message: 'be retry in existing directory',
  } as ErrorReason,
  existsDistPath: {
    code: 101,
    subject: 'Project directory already exists',
    message: 'please specify another project name',
  } as ErrorReason,
  cdCmdFail: {
    code: 102,
    subject: 'cd command failed',
    message: 'please specify another project name',
  } as ErrorReason,
  mvCmdFail: {
    code: 103,
    subject: 'mv command failed',
  } as ErrorReason,
  failPull: {
    code: 200,
    subject: 'Failed git pull from boilerplate repository',
  } as ErrorReason,
  cancelledCreatePj: {
    code: 300,
    subject: 'Cancelled project creation by user',
    message: 'be retry create project',
  } as ErrorReason,
  failNpmInst: {
    code: 400,
    subject: 'Failed npm install',
  } as ErrorReason,
  unmanagedException: {
    code: 999,
    subject: 'Unmanaged exception has occurred',
  } as ErrorReason,
};
