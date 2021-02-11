import { canCommiting, validateInstalled } from './Git';

describe('validateInstalled', () => {
  it('function can work', () => {
    const mockFn = jest.fn(() => {
      validateInstalled();
    });
    mockFn();

    expect(mockFn).toReturn();
  });
});

describe('canCommiting', () => {
  it('function can work', () => {
    const mockFn = jest.fn(() => {
      canCommiting();
    });
    mockFn();

    expect(mockFn).toReturn();
  });
});
