const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check if Authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not Authorized, Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      message: "Not Authorized, No Token",
    });
  }
};

module.exports = protect;