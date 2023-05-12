const { CustomApiError } = require("../errors/customeError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(500)
    .json({ message: "internal server error something went wrong" });
};

module.exports = errorHandlerMiddleware;
