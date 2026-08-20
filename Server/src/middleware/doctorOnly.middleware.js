export const doctorOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  if (req.user.role !== "doctor") {
    return res.status(403).json({
      message: "Doctor access only",
    });
  }

  next();
};
