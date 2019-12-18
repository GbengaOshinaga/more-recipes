class ControllerError extends Error {
  constructor(statusCode, ...args) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ControllerError);
    }

    this.name = 'ControllerError';
    this.statusCode = statusCode;
  }
}

export default ControllerError;
