import { verifyToken } from "../middlewares/token.middleware.js";
import musicModel from "../models/music.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createMusic = async (req, res) => {
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
        message: "Not authorize to access music creation",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Music file is required",
      });
    }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer, file.originalname);

    const music = await musicModel.create({
      url: result.url,
      title,
      artist: decoded.id,
    });

    res.status(201).send({
      message: "Music created successfully",
      music: {
        id: music._id,
        url: music.url,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
