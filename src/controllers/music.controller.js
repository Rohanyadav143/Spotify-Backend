import { verifyToken } from "../utils/token.util.js";
import musicModel from "../models/music.model.js";
import albumModel from "../models/album.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createMusic = async (req, res) => {
  try {
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
      artist: req.user.id,
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
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createAlbum = async (req, res) => {
  try {
    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics,
    });

    res.status(201).send({
      message: "Album created successfully",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
