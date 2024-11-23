'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Iconify from '@/@core/common/icon';
import { CustomLink } from '@/@core/tag/CustomLink';
const BreadCrumbs = () => {
  const pathname = usePathname();
  return (
    <div className="flex text-muted-foreground ">
      <CustomLink href="/">
        <Iconify
          icon="material-symbols-light:home"
          className="text-muted-foreground hover:text-foreground transition-all duration-300"
        />
      </CustomLink>
      {pathname === '/' ? '' : pathname}
    </div>
  );
};

export default BreadCrumbs;
