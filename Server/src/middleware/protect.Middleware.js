import jwt from "jsonwebtoken"


export const protect = async (req, res, next) => {
  const tokens = req.headers['authorization']?.split(' ')[1];
  // ? it may be null
  if (!tokens) {
    return res.status(401).json({ message: "not allowed" });
  }
  console.log(tokens);
  
  try {
    const decoded = jwt.verify(tokens, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "internel server error in protect",
    });
  }
};