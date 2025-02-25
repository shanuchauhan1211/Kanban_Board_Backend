import { verifyToken } from "../utils/jwtUtils";

export const middleware = async(req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
