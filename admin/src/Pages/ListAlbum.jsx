import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { url } from "../App";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbum = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);

      if (res.data.success) {
        setData(res.data.albums);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching albums");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const res = await axios.post(`${url}/api/album/remove`, { id });
      if (res.data.success) {
        toast.success("Album removed successfully");
        await fetchAlbum();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing album");
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div>
      <p>All Albums</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Color</b>
          <b>Action</b>
        </div>
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
              <img src={item.image} className="w-12" alt="album_img" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColor} />
              <div className="flex gap-2">
                <button
                  onClick={() => removeAlbum(item._id)}
                  className="text-sm text-gray-700 hover:text-gray-900 p-1 bg-red-400 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
