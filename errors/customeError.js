class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomeError = (msg, statusCode) => {
  console.log(statusCode, "status code");
  return new CustomApiError(msg, statusCode);
};

module.exports = {
  CustomApiError,
  createCustomeError,
};
