export type BaseTestType<ParamType, ExpectType> = {
  name: string;
  param: ParamType;
  expect: ExpectType;
};
