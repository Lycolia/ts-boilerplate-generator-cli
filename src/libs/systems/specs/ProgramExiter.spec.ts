import { ErrorReasons } from '../../../models/ExitReasons';
import { TsgException } from '../../../models/TsgException';
import * as ProgramExiter from './../ProgramExiter';

describe('exitApp', () => {
  /**
   * spy and mocking process.exit
   */
  jest.spyOn(process, 'exit').mockImplementation();
  /**
   * spy exitProgram
   */
  const mockExitProgram = jest.spyOn(ProgramExiter, 'exitProgram');

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('got TsgException', () => {
    const mockExitApp = jest.fn((ex) => {
      ProgramExiter.exitApp(ex);
    });
    mockExitApp(new TsgException(ErrorReasons.unmanagedException));

    expect(mockExitApp).toReturn();
    expect(mockExitProgram).toBeCalled();
  });

  it('got Error', () => {
    const mockExitApp = jest.fn((ex) => {
      ProgramExiter.exitApp(ex);
    });
    mockExitApp(new Error('errrrrrr'));

    expect(mockExitApp).toReturn();
    expect(mockExitProgram).toBeCalled();
  });
});

describe('exitProgram', () => {
  /**
   * spy and mocking process.exit
   */
  const mockExit = jest.spyOn(process, 'exit').mockImplementation();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('function can work', () => {
    const mockProgramExiter = jest.fn(() => {
      ProgramExiter.exitProgram(
        new TsgException(ErrorReasons.unmanagedException)
      );
    });
    mockProgramExiter();

    expect(mockProgramExiter).toReturn();
    expect(mockExit).toBeCalled();
  });
});
