import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };
    const album = albumModel(albumData);
    await album.save();

    res.status(201).json({ message: "Album added successfully", album });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding album" });
  }
};

const listAlbum = async (req, res) => {
  try {
    const albums = await albumModel.find();
    res.status(200).json({albums, success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching albums" });
  }
};

const removeAlbum = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedAlbum = await albumModel.findByIdAndDelete(id);
    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json({ message: "Album deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting album" });
  }
};

export { addAlbum, listAlbum, removeAlbum };
