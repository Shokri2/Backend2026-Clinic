import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    console.log("PROTECTED USER:", req.user);

    next();
  } catch (error) {
    console.error("PROTECT ERROR:", error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
