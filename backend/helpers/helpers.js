/* Create imports */
const jwt = require("jsonwebtoken");

/* Create helpers */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" });
};

const maxAge = 7 * 24 * 24 * 60 * 1000;

/* Create helpers */
module.exports = { createToken, maxAge };
