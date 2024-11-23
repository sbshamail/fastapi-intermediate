'use client';
import React from 'react';
import { useTheme } from '@/@core/theme/themeContext';
import { colors } from '@/@core/theme/chooseColor';
const ToggleColor = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className="space-x-1"
      style={{
        display: 'flex',
        margin: '0 auto',
      }}
    >
      {colors.length > 0 &&
        colors.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleTheme(item.label)}
            className={`rounded-3xl w-3 h-3 border border-[${item.color.toString()}] cursor-pointer flex justify-center items-center bg-[${item.color.toString()}] ${
              theme === item.label ? ` border-4 rounded-3xl p-2` : ''
            }`}
            style={{
              background:
                theme !== 'dark' && item.label === 'zinc'
                  ? 'white'
                  : item.color,
            }}
          ></div>
        ))}
    </div>
  );
};

export default ToggleColor;
