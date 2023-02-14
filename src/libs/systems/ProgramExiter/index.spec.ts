import { MyError } from 'src/libs/core/MyError';
import { ErrorReasons } from 'src/models/ErrorReasons';
import { ProgramExiter } from '.';

describe('exit', () => {
  const spiedExit = jest.spyOn(process, 'exit').mockImplementation();

  it('call exit', () => {
    ProgramExiter.exit(MyError.create(ErrorReasons.unmanagedException));

    expect(spiedExit).toBeCalled();
  });
});
