'use client';
import Image from 'next/image';
import React, { FC, useState } from 'react';

interface Props {
  images: string[];
  title: string;
}

const SwiperImageCard: FC<Props> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diffX = startX - clientX;

    if (Math.abs(diffX) > 50) {
      // Determine swipe direction
      if (diffX > 0) {
        handleSwipeLeft();
      } else {
        handleSwipeRight();
      }
      setIsDragging(false); // Reset dragging
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleSwipeLeft = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      className="w-full lg:flex "
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="w-full relative lg:order-last lg:ms-2">
        {/* Larger image on top */}
        <Image
          className="w-full pointer-events-none p-0 m-0 rounded-md cursor-pointer hover:opacity-90 transition"
          src={images[currentIndex]} // Use the image at the current index
          alt={title}
          width={500}
          height={500}
        />
      </div>
      <div className="flex items-center lg:flex-col lg:space-y-2 lg:order-first mt-2 space-x-2 lg:mt-0 lg:space-x-0">
        {/* Thumbnails on bottom */}
        {images.map((image, index) => (
          <Image
            key={index}
            className={`p-0 m-0 rounded-md w-20 h-20 cursor-pointer hover:opacity-90 transition ${
              index === currentIndex ? 'border-2 border-blue-500' : ''
            }`}
            src={image}
            alt={`${title} thumbnail ${index}`}
            width={100}
            height={100}
            onClick={() => setCurrentIndex(index)} // Update the main image on thumbnail click
          />
        ))}
      </div>
    </div>
  );
};

export default SwiperImageCard;
