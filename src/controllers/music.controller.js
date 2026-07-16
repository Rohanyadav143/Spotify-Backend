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

    res.status(201).json({
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

    res.status(201).json({
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

export const getAllMusics = async (req, res) => {
  try {
    const musics = await musicModel
      .find()
      .limit(20)
      .populate("artist", "userName email");
    res.status(200).json({
      message: "Musics fetched successfully",
      musics: musics,
    });
  } catch (error) {
    res.status(401).send({
      error: "Music fetched error",
    });
  }
};

export const getAllAlbum = async (req, res) => {
  const album = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");
  res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
};

export const getAlbumById = async (req, res) => {
  const albumId = req.params.albumId;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "userName email");

  return res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
};
