export class MyError extends Error {
  public error: unknown;

  constructor(message: string, error: unknown) {
    super(message);
    this.error = error;
  }
}
