export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "not authenticated",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "not allowed",
    });
  }

  next();
};
