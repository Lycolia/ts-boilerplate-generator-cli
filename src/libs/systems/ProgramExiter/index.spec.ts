import { ProgramExiter } from '.';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../core/MyError';

describe('exit', () => {
  const spiedExit = jest.spyOn(process, 'exit').mockImplementation();

  it('call exit', () => {
    ProgramExiter.exit(MyError.create(ErrorReasons.unmanagedException));

    expect(spiedExit).toBeCalled();
  });
});
