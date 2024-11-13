import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)} : ${
      audioUpload.duration % 60
    }`;

    const songData = {
      name,
      desc,
      album,
      file: audioUpload.secure_url,
      image: imageUpload.secure_url,
      duration,
    };

    console.log(songData);
    const song = songModel(songData);
    await song.save();
    res.status(201).json({ message: "Song added successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding song" });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.status(200).json({songs: allSongs, success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving songs" });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: "Song removed successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error removing song" });
  }
}

export { addSong, listSong, removeSong };
