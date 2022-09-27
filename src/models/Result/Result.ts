import { Result } from './type';

const createResult = <PayloadType>(
  obj: Result<PayloadType>
): Result<PayloadType> => {
  if (obj.hasError) {
    return {
      hasError: true,
      payload: obj.payload,
    };
  }

  return {
    hasError: false,
    payload: obj.payload,
  };
};

export const CommonResult = {
  createResult,
};
