import React, { FC } from 'react';
import Link from 'next/link';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';

interface Props extends ClassNameTypes {
  name: string;
  link?: string;
}

export const Menu: FC<Props> = ({ name, link, className }) => {
  return (
    <div>
      <div className={`group ${className} `}>
        <Link
          href={link || '#'}
          className={`uppercase font-semibold text-foreground hover:text-primary no-underline transition duration-300`}
        >
          {name}
        </Link>
        <div className="group-hover:border-b group-hover:border-primary mx-2 transition duration-500"></div>
      </div>
    </div>
  );
};
