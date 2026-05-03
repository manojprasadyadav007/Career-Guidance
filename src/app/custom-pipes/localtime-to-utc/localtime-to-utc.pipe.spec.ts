import { LocaltimeToUtcPipe } from './localtime-to-utc.pipe';

describe('LocaltimeToUtcPipe', () => {
  it('create an instance', () => {
    const pipe = new LocaltimeToUtcPipe();
    expect(pipe).toBeTruthy();
  });
});
