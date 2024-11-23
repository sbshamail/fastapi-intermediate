'use client';
import Iconify from '@/@core/common/icon';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const ProductFavorite = ({ className }: ClassNameTypes) => {
  return (
    <div onClick={(e) => e.preventDefault()}>
      <Iconify
        icon="mdi:heart-outline"
        className={twMerge(
          ` hover:text-red-700 hover:scale-105 Transition`,
          `${className}`
        )}
      />
    </div>
  );
};
