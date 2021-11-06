import { ErrorReasons, reportError } from '../../../models/ExitReasons';
import * as ProgramExiter from './../ProgramExiter';

describe('exitApp', () => {
  jest.spyOn(process, 'exit').mockImplementation();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('got AppError', () => {
    const mockExitApp = jest.fn((ex) => {
      ProgramExiter.exitApp(ex);
    });
    mockExitApp(reportError(ErrorReasons.unmanagedException));

    expect(mockExitApp).toReturn();
  });
});
