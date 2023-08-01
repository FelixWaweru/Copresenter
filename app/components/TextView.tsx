"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerWaveIcon, SpeakerXMarkIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const TextView = ({ itemList }) => {
  const [scroll, setScroll] = useState(false);

  const [speaking, setSpeaking] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlideText, setActiveSlideText] = useState(itemList[currentSlide]?.text || itemList[0].text);

  const audioRef = useRef(null);

  const handleScrollButtonClick = () => {
    setScroll(!scroll);
  };

  const handleNextSlideClick = () => {
    let nextSlideValue = currentSlide + 1

    if (currentSlide < itemList.length - 1 && currentSlide >= 0) {
      setCurrentSlide(nextSlideValue);

      if(itemList[nextSlideValue].presenter === "BOT" && itemList[nextSlideValue].audio_link !== "" && speaking) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioPlay(itemList[nextSlideValue].audio_link);
      }
    }
  };

  const handlePrevSlideClick = () => {
    let prevSlideValue = currentSlide - 1

    if (currentSlide <= itemList.length - 1 && currentSlide > 0) {
      setCurrentSlide(prevSlideValue);

      if(itemList[prevSlideValue].presenter === "BOT" && itemList[prevSlideValue].audio_link !== "" && speaking) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioPlay(itemList[prevSlideValue].audio_link);
      }
    }
  };

  const handleAudioPlayerToggle = () => {
    const newSpeaking = !speaking;
    setSpeaking(newSpeaking);

    if(itemList[currentSlide].presenter === "BOT" && itemList[currentSlide].audio_link !== "" && newSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioPlay(itemList[currentSlide].audio_link);
    }
  };

  const handleAudioPlayerPause = () => {
    const newSpeaking = !speaking;
    setSpeaking(newSpeaking);

    if (audioRef.current) {
        audioRef.current.pause();
    }
  };

  const audioPlay = async (url) => {
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.play()
      .then(() => {
        console.log('Audio playback started.');
      })
      .catch((error) => {
        console.error('Error playing audio:', error);
      });
  }

  useEffect(() => {
    setActiveSlideText(itemList[currentSlide]?.text || itemList[0].text);
  },[currentSlide, itemList]);

  return (
      <div className='ml-auto w-4/4 md:w-3/4 h-screen flex flex-col'>
        <div className='w-full' style={{height: '100%', background: '#ebecf0'}}>
          <div className='mt-20 text-center text-4xl text-gray-900'>
            {currentSlide + 1} / {itemList.length} {itemList[currentSlide]?.presenter === "BOT" ? "🤖" : "🧑🏽"}
          </div>
          <div className='mt-10 text-center text-xl px-10 leading-[3rem] text-gray-900'>
            {activeSlideText}
          </div>
          
        </div>
        <div className='bottom-0 bg-gray-900 flex justify-center items-center'>
            <div onClick={handlePrevSlideClick} className='hover:bg-green-500 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <BackwardIcon className="h-10 w-10 text-white"/>
            </div>

            {speaking && (
            <div onClick={handleAudioPlayerPause} className='bg-green-500 hover:bg-green-400 cursor-pointer my-4 mx-2 p-3 rounded-lg inline-block'>
              <SpeakerWaveIcon className="h-10 w-10 text-white"/>
            </div>
            )}

            {!speaking && (
            <div onClick={handleAudioPlayerToggle} className='bg-red-500 hover:bg-red-400 cursor-pointer my-4 mx-2 p-3 rounded-lg inline-block'>
              <SpeakerXMarkIcon className="h-10 w-10 text-white"/>
            </div>
            )}

            <div onClick={handleNextSlideClick} className='hover:bg-green-500 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <ForwardIcon className="h-10 w-10 text-white"/>
            </div>
        </div>
        <div className='bottom-0 bg-gray-900 flex justify-center items-center text-xs pb-2 text-gray-500'>
          by &nbsp;
          <Link href="https://github.com/FelixWaweru" 
                className='text-green-300'
                target="_blank">
            FelixWaweru
          </Link>
        </div>
      </div>
  );
};

export default TextView;
