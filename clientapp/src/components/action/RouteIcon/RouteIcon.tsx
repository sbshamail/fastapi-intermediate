'use client';
import React, { FC } from 'react';
import Iconify from '@/@core/common/icon';
import { useRouter } from 'next/navigation';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';

interface Props extends ClassNameTypes {
  icon: string;
  path?: string;
}
const RouteIcon: FC<Props> = ({ className, icon, path = '/' }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(path);
  };
  return (
    <div>
      <Iconify
        icon={icon}
        className={`text-2xl  ${className}`}
        onClick={handleRedirect}
      />
    </div>
  );
};

export default RouteIcon;
