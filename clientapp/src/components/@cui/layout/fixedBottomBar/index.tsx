'use client';
import React, { FC, useEffect } from 'react';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';
import { twMerge } from 'tailwind-merge';
interface Props extends ClassNameTypes {
  children?: React.ReactNode;
}

export const FixedBottomBar: FC<Props> = ({ children, className }) => {
  useEffect(() => {
    const updatePadding = () => {
      const bottomBar = document.getElementById('bottom-bar');
      const mainContent = document.getElementById('main-content');
      if (bottomBar && mainContent && children) {
        const bottomBarHeight = bottomBar.offsetHeight;
        mainContent.style.paddingBottom = `${bottomBarHeight + 16}px`; // 16px for extra spacing
      } else if (mainContent) {
        mainContent.style.paddingBottom = '0px';
      }
    };
    updatePadding();
    window.addEventListener('resize', updatePadding);

    return () => {
      window.removeEventListener('resize', updatePadding);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);
  return (
    <div
      id="bottom-bar"
      className={`${twMerge(
        `md:hidden z-navbar w-full fixed p-1 px-2 bottom-0  bg-background`,
        `${className}`
      )} `}
    >
      {children}
    </div>
  );
};
