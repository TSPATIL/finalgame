import React, { useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

export default function Music() {
    const handleMusicEnd = ()=>{
        const audio = document.getElementById('music');
        console.log(audio.src)
        if(audio.src === `${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/music1.mp3`){
            audio.src = "music2.mp3"
        }
        else{
            audio.src = "music1.mp3"
            audio.play();
        }
    }
    const [music, setMusic] = useState(true);
    const handleMusic = ()=>{
        const audio = document.getElementById('music');
        if(music){
            audio.pause();
        }
        else{
            audio.play();
        }
        setMusic(!music)
    }
  return (
    <div className='Music w-full'>
        <div onClick={handleMusic} className='p-5 cursor-pointer rounded-full bg-purple-500 hover:bg-purple-600 transition duration-200 shadow-xl hover:scale-95 text-white fixed bottom-10 z-50 right-10 font-bold text-2xl flex justify-center items-center'>{music ? <FaPlay/> : <FaPause/>}</div>
        <audio id='music' src="music1.mp3" autoPlay onEnded={handleMusicEnd}></audio>
    </div>
  )
}
