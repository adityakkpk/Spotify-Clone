import React, { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`);

      if (res.data.success) {
        setData(res.data.songs);
      }
    } catch (error) {
      toast.error("Error fetching songs");
      console.error(error);
    }
  };

  const removeSong = async (id) => {
    try {
      const res = await axios.post(`${url}/api/song/remove`, { id });
      console.log(res.data);
      if (res.data.success) {
        toast.success("Song removed successfully");
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error removing song");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div className="">
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item,idx) => (
          <div key={idx}>
            <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
              <img src={item.image} alt="" className="w-12" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration.split(" : ")[0]} : {parseInt(item.duration.split(" : ")[1])}</p>
              <div>
                <button
                  onClick={() => removeSong(item._id)}
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

export default ListSong;
