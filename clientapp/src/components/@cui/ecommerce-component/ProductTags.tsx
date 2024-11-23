import { ClassNameTypes } from '@/utils/interfaces/commonTypes';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ClassNameTypes {
  title: string;
}
export const ProductTags: FC<Props> = ({ title, className }) => {
  return (
    <div
      className={twMerge(
        `px-2 py-0.5 block text-center text-sm font-medium bg-primary/80 first:mt-0 mt-2 text-primary-foreground`,
        `${className}`
      )}
    >
      {title}
    </div>
  );
};
