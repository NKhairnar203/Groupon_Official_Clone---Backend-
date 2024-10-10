const adminCheck = (req, res, next) => {
  try {
    console.log(req.user.isAdmin);
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      req.stutas(501).json({
        message: "You are not Admin...",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = adminCheck;
