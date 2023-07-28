"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, FastForwardIcon, RewindIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const TextView = ({ itemList }) => {
  const [scroll, setScroll] = useState(false);

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

  useEffect(() => {
    setActiveSlideText(itemList[currentSlide]?.text || itemList[0].text);
  },[currentSlide, itemList]);

  return (
      <div className='ml-auto w-3/4 h-screen flex flex-col'>
        <div className='w-full' style={{height: '100%'}}>
          <div className='mt-5 text-center text-6xl'>
            {currentSlide + 1} / {itemList.length} {itemList[currentSlide]?.presenter === "BOT" ? "🤖" : "🧑🏽"}
          </div>
          <div className='mt-20 text-center text-xl px-10 leading-[5rem]'>
            {activeSlideText}
          </div>
          {/* <motion.div
            initial={{ y: '80vh' }}
            animate={{ y: scroll ? '-80vh' : '80vh' }}
            exit={{ y: '-80vh' }}
            style={{lineHeight: '5'}}
            transition={{ duration: 15, loop: Infinity, ease: 'linear' }}
            className='text-center text-2xl px-10'
          >
            {activeSlideText}
          </motion.div> */}
          
          <div className='fixed bottom-0 bg-gray-900 w-3/4 flex justify-center items-center'>
              <div onClick={handlePrevSlideClick} className='bg-green-400 hover:bg-green-600 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                <RewindIcon className="h-10 w-10 text-primary"/>
              </div>

              <div onClick={handleScrollButtonClick} className='bg-green-400 hover:bg-green-600 cursor-pointer my-4 mx-2 p-3 rounded-lg inline-block'>
                <PlayIcon className="h-10 w-10 text-primary"/>
              </div>

              <div onClick={handleNextSlideClick} className='bg-green-400 hover:bg-green-600 cursor-pointer my-4 p-3 rounded-lg inline-block'>
                <FastForwardIcon className="h-10 w-10 text-primary"/>
              </div>
          </div>
        </div>
      </div>
  );
};

export default TextView;
