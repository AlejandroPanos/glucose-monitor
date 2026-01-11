/* Create imports */

/* Create middleware */
const checkAdmin = (req, res, next) => {
  const user = req.user;

  if (user.role !== "admin") {
    return res.status(401).json({ error: "User unauthorised" });
  } else {
    next();
  }
};

/* Create exports */
module.exports = { checkAdmin };
