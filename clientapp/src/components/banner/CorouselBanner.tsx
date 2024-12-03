'use client';
import React from 'react';
import Screen from '@/app/overlayer';
import MyCarousel from '../carousel/MyCarousel';
import { carousalData } from '@/utils/contents/maincarousal';
const CorouselBanner = () => {
  return (
    <div>
      <Screen>
        <div className=" flex items-center">
          <div className=" lg:w-[25%] xl:[20%] lg:ml-10 xl:ml-0"></div>
          {/* <MyCarousel data={carousalData} /> */}
        </div>
      </Screen>
    </div>
  );
};

export default CorouselBanner;
