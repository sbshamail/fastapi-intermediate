'use client';
import useGetWindow from '@/@core/customHooks/useGetWindow';
import React from 'react';
import useDivDimensions from '@/@core/customHooks/useDivDimensions';
import { ChildrenTypes } from '@/utils/interfaces/commonTypes';
import Topbar from '../layout/topbar/Topbar';
import Shadow from '@/@core/tag/Shadow';
import { usePathname } from 'next/navigation';

const HeaderClientLayout = ({ children }: ChildrenTypes) => {
  const pathname = usePathname();
  const conditionFunc = (window: Window) => window.scrollY > 0;
  const { condition } = useGetWindow(['scroll'], conditionFunc);
  const { dimension, divRef } = useDivDimensions(['resize']);
  return (
    <div className={`${pathname === '/' ? '' : 'mb-10'} `}>
      <div style={{ height: dimension?.bottom, marginBottom: dimension?.y }}>
        <div
          ref={divRef}
          className={`w-full  transition-top-transform duration-300 z-navbar fixed top-0 `}
        >
          <div
            className={`${condition ? 'fixed -top-96' : 'hidden md:block'} `}
          >
            <Topbar />
          </div>
          <Shadow className="bg-background/90">{children}</Shadow>
        </div>
      </div>
    </div>
  );
};

export default HeaderClientLayout;
