import { availableDestination, getCwdPath } from './FileSystem';

describe('getdistPath', () => {
  it('function can work', () => {
    expect(getCwdPath()).toBe(process.cwd());
  });
});

describe('availableDestination', () => {
  it('available', () => {
    expect(availableDestination('/home/foo')).toBe(true);
  });
  it('unavailable', () => {
    expect(availableDestination('/home')).toBe(false);
  });
});
