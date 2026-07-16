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
        message: "Not authorize to access album",
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

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        message: "Token not found",
      });
    }

    const decoded = await verifyToken(token);

    if (decoded.role !== "user") {
      res.status(401).json({
        message: "Unauthorized access",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(402).json({
      message: "Unauthorized user",
    });
  }
};

