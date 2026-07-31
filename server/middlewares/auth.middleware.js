import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({ success: false, message: -"Not Authorized Login Again" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(400).json({ success: false, message: "Unauthorized -Invaild token" });
    }

    req.user = decode.id;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
