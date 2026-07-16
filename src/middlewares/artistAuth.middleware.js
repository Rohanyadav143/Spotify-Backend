import { verifyToken } from "../utils/token.util.js";

export const authArtist = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send({
        message: "Token not found",
      });
    }

    const decoded = await verifyToken(token);

    if (decoded.role !== "artist") {
      return res.status(403).send({
        message: "Not authorize to access album creation",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
