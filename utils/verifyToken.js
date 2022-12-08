const jwt = require("jwt");
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // if no token is found
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // if token do not match with server's jwt secret key
    if (err) return next(createError(403, "Access token is not valid"));
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
