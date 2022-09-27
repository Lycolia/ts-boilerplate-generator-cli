import { AppError } from '../../libs/types/Error';

export type Result<PayloadType> =
  | {
      hasError: false;
      payload: PayloadType;
    }
  | {
      hasError: true;
      payload: AppError;
    };
