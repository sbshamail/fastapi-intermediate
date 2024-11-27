'use client';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

export const MouseLeaveEnterImage: FC<{ images: string[]; title: string }> = ({
  images,
  title,
}) => {
  const [imageSrc, setImageSrc] = useState(images[0]);
  useEffect(() => {
    setImageSrc(images[0]);
  }, [images]);
  const handleImageMouse = (n = 0) => {
    setImageSrc(images[n] ?? images[0]);
  };
  const validImageSrc = `${imageSrc}`;

  return (
    <Image
      key={validImageSrc} // Ensure the key changes with each URL update
      onMouseLeave={() => handleImageMouse(0)}
      onMouseEnter={() => handleImageMouse(1)}
      className="mx-auto rounded-lg m-0"
      src={imageSrc}
      alt={title}
      width={500}
      height={500}
    />
  );
};
