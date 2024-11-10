import express, { Router } from 'express';
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumController.js';
import upload from "../middleware/multer.js";

const albumRouter = Router();

albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get("/list", listAlbum);
albumRouter.delete("/remove", removeAlbum);

export default albumRouter;