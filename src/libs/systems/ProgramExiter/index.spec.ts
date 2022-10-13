import { MyError } from 'src/libs/core/MyError';
import { ErrorReasons } from 'src/models/ErrorReasons';
import * as ProgramExiter from '.';

describe('exitApp', () => {
  const spiedExit = jest.spyOn(process, 'exit').mockImplementation();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('call exit', () => {
    ProgramExiter.exitApp(MyError.create(ErrorReasons.unmanagedException));

    expect(spiedExit).toBeCalled();
  });
});
