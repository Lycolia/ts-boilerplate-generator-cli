import { ErrorReasons, createError } from 'src/models/ErrorReasons';
import * as ProgramExiter from '.';

describe('exitApp', () => {
  jest.spyOn(process, 'exit').mockImplementation();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('got AppError', () => {
    const mockExitApp = jest.fn((ex) => {
      ProgramExiter.exitApp(ex);
    });
    mockExitApp(createError(ErrorReasons.unmanagedException));

    expect(mockExitApp).toReturn();
  });
});
