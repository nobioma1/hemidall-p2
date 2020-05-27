class CustomError extends Error {
  constructor(message, statusCode = 400) {
    super();
    this.status = statusCode;
    this.message = message;
  }
}

module.exports = { CustomError };
