import { UtcToLocaltimePipe } from './utc-to-localtime.pipe';

describe('UtcToLocaltimePipe', () => {
  it('create an instance', () => {
    const pipe = new UtcToLocaltimePipe();
    expect(pipe).toBeTruthy();
  });
});
