import express from "express";
import { createMusic } from "../controllers/music.controller.js";
import multer from "multer";

const upload = multer({});

const router = express.Router();

router.post("/create", upload.single("music"), createMusic);

export default router;
