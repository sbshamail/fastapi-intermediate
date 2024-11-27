'use client';
import Iconify from '@/@core/common/icon';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const index = ({ className }: ClassNameTypes) => {
  return (
    <div onClick={(e) => e.preventDefault()}>
      <Iconify
        icon="lucide:focus"
        className={twMerge(`hover:scale-105 Transition`, `${className}`)}
      />
    </div>
  );
};

export default index;
