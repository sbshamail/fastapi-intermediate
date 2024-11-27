import Iconify from '@/@core/common/icon';
import React from 'react';

const MobileBottomFixed = () => {
  return (
    <div className="flex justify-between ">
      <Iconify icon="material-symbols-light:home" />
      <Iconify icon="fe:cart" />
      <Iconify icon="material-symbols:person-outline" />
    </div>
  );
};

export default MobileBottomFixed;
