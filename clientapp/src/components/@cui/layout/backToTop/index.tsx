'use client';
import Iconify from '@/@core/common/icon';
import useGetWindow from '@/@core/customHooks/useGetWindow';
import React from 'react';

const BackToTop = () => {
  const { scrollY, width, height, clientWindow } = useGetWindow(['scroll']);
  const showArrowTop = scrollY > height ? true : false;
  const handleClick = () => {
    clientWindow?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        showArrowTop
          ? 'fixed bottom-0 right-0 bg-primary/20 hover:bg-primary z-navbar rounded-full h-6 w-6 mb-10 me-1'
          : 'hidden'
      }`}
    >
      <Iconify icon="iconamoon:arrow-up-2" />
    </div>
  );
};

export default BackToTop;
