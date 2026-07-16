import express from "express";
import { createAlbum, createMusic } from "../controllers/music.controller.js";

import multer from "multer";
import { authArtist } from "../middlewares/artistAuth.middleware.js";

const upload = multer({});

const router = express.Router();

router.post("/create", authArtist, upload.single("music"), createMusic);
router.post("/album", authArtist, createAlbum);

export default router;
