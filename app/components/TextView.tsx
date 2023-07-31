"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerWaveIcon, SpeakerXMarkIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const TextView = ({ itemList }) => {
  const [scroll, setScroll] = useState(false);

  const [speaking, setSpeaking] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSlideText, setActiveSlideText] = useState(itemList[currentSlide]?.text || itemList[0].text);

  const handleScrollButtonClick = () => {
    setScroll(!scroll);
  };

  const handleNextSlideClick = () => {
    let nextSlideValue = currentSlide + 1

    if (currentSlide < itemList.length - 1 && currentSlide >= 0) {
      setCurrentSlide(nextSlideValue);
    }
  };

  const handlePrevSlideClick = () => {
    let prevSlideValue = currentSlide - 1

    if (currentSlide <= itemList.length - 1 && currentSlide > 0) {
      setCurrentSlide(prevSlideValue);
    }
  };

  const handleAudioPlayerToggle = () => {
    setSpeaking(!speaking);
  };

  useEffect(() => {
    setActiveSlideText(itemList[currentSlide]?.text || itemList[0].text);
  },[currentSlide, itemList]);

  return (
      <div className='ml-auto w-3/4 h-screen flex flex-col'>
        <div className='w-full' style={{height: '100%', background: '#ebecf0'}}>
          <div className='mt-5 text-center text-4xl text-gray-900'>
            {currentSlide + 1} / {itemList.length} {itemList[currentSlide]?.presenter === "BOT" ? "🤖" : "🧑🏽"}
          </div>
          <div className='mt-20 text-center text-xl px-10 leading-[5rem] text-gray-900'>
            {activeSlideText}
          </div>
          
          <div className='fixed bottom-0 bg-gray-900 w-3/4 flex justify-center items-center'>
              <div onClick={handlePrevSlideClick} className='hover:bg-green-500 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                <BackwardIcon className="h-10 w-10 text-white"/>
              </div>

              {speaking && (
              <div onClick={handleAudioPlayerToggle} className='bg-green-500 hover:bg-green-400 cursor-pointer my-4 mx-2 p-3 rounded-lg inline-block'>
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
        </div>
      </div>
  );
};

export default TextView;
