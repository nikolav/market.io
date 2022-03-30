const jwt = require("jsonwebtoken");

const AUTHENTICATED = ".isAuthenticated";

function verifyToken(req, res, next) {
  const auth_ = req.get("Authorization");
  if (!auth_) return next();

  const tok_ = auth_.split(" ")[1];
  if (!tok_) return next();

  let jwtPayload = null;

  try {
    jwtPayload = jwt.verify(tok_, process.env.SECRETORKEY);

    if (!jwtPayload) return next();
  } catch (error) {
    return next();
  }

  req[AUTHENTICATED] = { ...jwtPayload, "_@": Date.now() };

  return next();
}

module.exports = {
  verifyToken,
  AUTHENTICATED,
};
