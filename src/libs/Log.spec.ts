import { TsgException } from '../models/TsgException';
import { infoLog, warnLog, errorLog } from './Log';

describe('infoLog', () => {
  it('function can work', () => {
    console.info = jest.fn();
    infoLog({ test: 'foo', hoge: 'bar' });
    expect(console.info).toBeCalled();
  });
});

describe('warnLog', () => {
  it('function can work', () => {
    console.warn = jest.fn();
    warnLog({ test: 'foo', hoge: 'bar' });
    expect(console.warn).toBeCalled();
  });
});

describe('errorLog', () => {
  it('function can work', () => {
    console.error = jest.fn();
    errorLog({ test: 'foo', hoge: 'bar' });
    expect(console.error).toBeCalled();
  });
});
