const { CustomApiError } = require("../errors/customeError");
const jwt = require("jsonwebtoken");

const authenticateMiddleWare = (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer")) {
    throw new CustomApiError("No token provided", 401);
  }
  const token = authHead.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, name } = decoded;
    req.user = { id, name };
    next();
  } catch (error) {
    throw new CustomApiError("Not authorized to access this route", 401);
  }
};

module.exports = authenticateMiddleWare;
