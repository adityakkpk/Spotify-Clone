import React, { useState } from "react";
import { assets } from "../assets/assets";

const AddSong = () => {

  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none"); 
  const [loadings, setLoadings] = useState(false);
  const [errors, setErrors] = useState('');
  const [albumData, setAlbumData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadings(true);
    setErrors('');
  }

  return (
    <form className="flex flex-col items-start gap-8 text-gray-600" onSubmit={handleSubmit}>
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input type="file" hidden id="song" accept="audio/*" />
          <label htmlFor="song">
            <img
              src={assets.upload_song}
              alt="upload_song"
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input type="file" name="" id="image" accept="image/*" hidden />
          <label htmlFor="image">
            <img
              src={assets.upload_area}
              alt=""
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          type="text"
          placeholder="Enter song name"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          type="text"
          placeholder="Enter song name"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          required
        />
      </div>

      <div className="flex flex-col gap-2 5">
        <p>Album</p>
        <select className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]">
          <option value="none">None</option>
          <option value="1">Album 1</option>
          <option value="2">Album 2</option>
          <option value="3">Album 3</option>
        </select>
      </div>

      <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">ADD</button>
    </form>
  );
};

export default AddSong;
