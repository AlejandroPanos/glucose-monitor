/* Create imports */
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* Create middleware */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET, function (error, decodedToken) {
      if (error) {
        return res.status(401).json({ error: "User unauthorised" });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({ error: "User unauthorised" });
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET, async function (error, decodedToken) {
      if (error) {
        req.user = null;
        return next();
      } else {
        const user = await User.findById(decodedToken.id);
        req.user = user;
        next();
      }
    });
  } else {
    req.user = null;
    return next();
  }
};

/* Create exports */
module.exports = { requireAuth, checkUser };
