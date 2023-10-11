import { ErrorReason, AppError } from '../../../models/ErrorReasons/type';

const create = (reason: ErrorReason, error?: unknown): AppError => {
  return { reason, error };
};

const hasError = <T>(value: T | AppError): value is AppError => {
  if (value !== null && typeof value === 'object') {
    return 'reason' in value;
  }
  return false;
};

export const MyError = {
  create,
  hasError,
};
