import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({image,name,desc,id}) => {
    const navigate = useNavigate();
  return (
    <div className='min-w-[180px] px-3 rounded cursor-pointer hover:bg-[#ffffff26]' onClick={() => navigate(`/album/${id}`)}>
        <img src={image} className="rounded" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 txt-sm'>{desc}</p>
    </div>
  )
}

export default AlbumItem