import jwt from "jsonwebtoken";

export const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token", error: error.message });
  }
};
