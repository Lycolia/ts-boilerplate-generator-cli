import * as git from '../Git';

jest.spyOn(git, 'validateInstalled');
jest.spyOn(git, 'canCommiting');

describe('validateInstalled', () => {
  it('function can work', () => {
    git.validateInstalled();

    expect(git.validateInstalled).toBeCalled();
    expect(git.validateInstalled).toReturn();
  });
});

describe('canCommiting', () => {
  it('function can work', () => {
    git.canCommiting();

    expect(git.canCommiting).toBeCalled();
    expect(git.canCommiting).toReturn();
  });
});
