import * as cli from '../dist/cli/cli';

const logSpy = vi.spyOn(console, 'log');
const errorSpy = vi.spyOn(console, 'error');

afterAll(() => {
  logSpy.mockRestore();
  errorSpy.mockRestore();
});

test('help: all commands', async () => {
  await cli.run({
    args: { _: ['help'], $0: 'node' },
  });

  expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Commands'));
});

test('help: build sub command', async () => {
  await cli.run({
    args: { _: ['help', 'build'], $0: 'node' },
  });

  expect(console.log).toHaveBeenCalledWith(
    expect.stringContaining('--no-clean'),
  );
});

test('help: invalid sub command', async () => {
  await cli.run({
    args: { _: ['help', 'invalid'], $0: 'node' },
  });

  expect(console.error).toHaveBeenCalledWith(
    expect.any(String),
    expect.stringContaining('Invalid'),
  );
});
