import { MyProgram } from '.';
import { ErrorReasons } from '../../../models/ErrorReasons';
import { MyError } from '../../util/MyError';

describe('exit', () => {
  const spiedExit = jest.spyOn(process, 'exit').mockImplementation();

  it('call exit', () => {
    MyProgram.exit(new MyError(ErrorReasons.unmanagedException));

    expect(spiedExit).toBeCalled();
  });
});
