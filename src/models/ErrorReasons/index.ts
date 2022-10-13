import { ErrorReason } from './type';

export const ErrorReasons = {
  ok: { code: 0, subject: 'OK', message: 'OK' } as ErrorReason,
  gitNotFound: {
    code: 1,
    subject: 'Git not found',
    message: 'should install Git or export Git path',
  } as ErrorReason,
  gitNotConfigure: {
    code: 2,
    subject: 'Git not configure',
    message: 'should configure Git user.name and user.email',
  } as ErrorReason,
  cdNotExists: {
    code: 100,
    subject: 'Current directory may does not exist',
    message: 'be retry in existing directory',
  } as ErrorReason,
  existsDestPath: {
    code: 101,
    subject: 'Project directory already exists',
    message: 'please specify another project name',
  } as ErrorReason,
  mvCmdFail: {
    code: 103,
    subject: 'failed create project directory',
  } as ErrorReason,
  failPull: {
    code: 200,
    subject: 'failed git pull from boilerplate repository',
  } as ErrorReason,
  cancelledCreatePj: {
    code: 300,
    subject: 'Cancelled project creation by user',
    message: 'be retry create project',
  } as ErrorReason,
  failNpmInst: {
    code: 400,
    subject: 'failed npm install',
  } as ErrorReason,
  unmanagedException: {
    code: 999,
    subject: 'unmanaged exception has occurred',
  } as ErrorReason,
};
