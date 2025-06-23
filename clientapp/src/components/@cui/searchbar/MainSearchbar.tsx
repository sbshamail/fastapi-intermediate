'use client';
import React, { ChangeEvent, FC } from 'react';
import Iconify from '@/@core/common/icon';

interface Props {
  label?: string;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: string | any;
  className?: string;
  setFilterEnter?: (b: boolean) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxlength?: string | any;
  max?: number;
  min?: number;
  minLength?: number;
  inputSize?: '0' | '1' | '2' | '3';
  rows?: number;
  id?: string;
}
const MainSearchbar: FC<Props> = ({
  type,
  label,
  required,
  name,
  placeholder = 'Search ...',
  value,
  setFilterEnter = () => false,
  onChange,
  inputSize,
  size,
  className,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setFilterEnter(true);
    }
  };
  let inputSizeClass = 'py-2';
  if (inputSize === '0') {
    inputSizeClass = '!py-0';
  } else if (inputSize === '1') {
    inputSizeClass = '!py-1';
  } else if (inputSize === '2') {
    inputSizeClass = 'py-2';
  } else if (inputSize === '3') {
    inputSizeClass = 'py-3';
  }
  return (
    <div className="flex items-start flex-col">
      {label && (
        <label>
          {label} &nbsp;
          {required && <span>*</span>}
        </label>
      )}
      <div
        className={`w-full relative overflow-hidden bordering  group focus-within:border-primary ${className} `}
      >
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          className={`${inputSizeClass}  relative  !border-none leading-tight active:border-none focus:border-none w-full`}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => setFilterEnter(true)}
          className="h-full px-2 w-auto absolute hover:bg-primary border-l border-muted group-focus-within:border-primary group-focus-within:bg-primary right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          <Iconify
            fontSize={size ? '1.4em' : '1.6em'}
            icon="material-symbols-light:search"
            className={`text-foreground p-0 m-0 group-focus-within:text-primary-foreground`}
          />
        </button>
      </div>
    </div>
  );
};

export default MainSearchbar;
