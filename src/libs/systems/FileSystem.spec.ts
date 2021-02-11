import { canAllocPath, getCwdPath } from './FileSystem';

describe('getdistPath', () => {
  it('function can work', () => {
    expect(getCwdPath()).toBe(process.cwd());
  });
});

describe('canAllocPath', () => {
  it('can alloc', () => {
    expect(canAllocPath('/home/foo')).toBe(true);
  });
  it('can not alloc', () => {
    expect(canAllocPath('/home')).toBe(false);
  });
});
