import express from "express";
import {
  createAlbum,
  createMusic,
  getAlbumById,
  getAllAlbum,
  getAllMusics,
} from "../controllers/music.controller.js";

import multer from "multer";
import { authArtist, authUser } from "../middlewares/artistAuth.middleware.js";

const upload = multer({});

const router = express.Router();

router.post("/create", authArtist, upload.single("music"), createMusic);
router.post("/album", authArtist, createAlbum);
router.get("/", authUser, getAllMusics);
router.get("/album", authArtist, getAllAlbum);
router.get("/album/:albumId", authArtist, getAlbumById);

export default router;
