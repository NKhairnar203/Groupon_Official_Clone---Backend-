const adminCheck = (req, res, next) => {
  try {
    console.log(req.user.isAdmin);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No User Data" });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied: Admins Only" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminCheck;
