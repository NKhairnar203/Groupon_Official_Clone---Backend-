// authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyTokenForUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.USER_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = verifyTokenForUser;