'use client';
import Iconify from '@/@core/common/icon';
import { useTheme } from '@/@core/theme/themeContext';
import React, { FC } from 'react';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';

interface Props extends ClassNameTypes {}
const ToggleMode: FC<Props> = ({ className }) => {
  const { toggleMode, theme } = useTheme();
  const icon = theme === 'light' ? 'tabler:bulb' : 'tabler:bulb-filled';
  return (
    <div className={`${className}`}>
      <Iconify
        className="!text-primary"
        icon={icon}
        fontSize={'1.5em'}
        onClick={toggleMode}
      />
    </div>
  );
};

export default ToggleMode;
