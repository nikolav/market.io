const jwt = require("jsonwebtoken");

const isAuthenticated = ".isAuthenticated";

function verifyToken(req, res, next) {
  const auth_ = req.get("Authorization");
  if (!auth_) return next();

  const tok_ = auth_.split(" ")[1];
  if (!tok_) return next();

  let jwtPayload = null;

  try {
    jwtPayload = jwt.verify(tok_, process.env.process.env.SECRETORKEY);

    if (!jwtPayload) return next();
  } catch (error) {
    return next();
  }

  req[isAuthenticated] = jwtPayload._id;
  return next();
}

module.exports = {
  verifyToken, 
  isAuthenticated,
};
