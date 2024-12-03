'use client';
import { ClassNameType } from '@/utils/interfaces/commonTypes';
import React, { ChangeEvent, KeyboardEvent, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  label?: string;
  labelClass?: ClassNameType;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textarea?: boolean;
  className?: string;
  maxlength?: string | any;
  max?: number;
  min?: number;
  minLength?: number;
  size?: string | any;
  inputSize?: '0' | '1' | '2' | '3';
  rows?: number;
  id?: string;
  // For React Hook Form compatibility
  register?: any;
  errors?: any;
}
const TextField: FC<Props> = ({
  id,
  label,
  required,
  type = 'text',
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  textarea = false,
  className = '',
  maxlength,
  max,
  min,
  minLength,
  size,
  labelClass = 'text-sm mb-1',
  inputSize = '1',
  rows = 4,
  // For React Hook Form compatibility
  register,
  errors,
}) => {
  let InputSize = 'py-2';
  if (inputSize === '0') {
    InputSize = '!py-0';
  } else if (inputSize === '1') {
    InputSize = '!py-1';
  } else if (inputSize === '2') {
    InputSize = 'py-2';
  } else if (inputSize === '3') {
    InputSize = 'py-3';
  }

  let inputProps = {
    id,
    name,
    placeholder,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    className,
    type: type == 'tel' ? 'number' : type,
    maxLength: maxlength,
    max,
    min,
    minLength,
    size,
    rows,
  };
  // register is react hook field
  register ? (inputProps = { ...inputProps, ...register(name) }) : inputProps;
  const mergedClassName = twMerge(
    `${InputSize} outline-none bordering ${errors && name && errors[name] && 'border !border-red-500'} ${type == 'tel' ? 'input-textfield' : ''}`,
    className
  );
  return (
    <>
      <div className="flex items-start flex-col">
        {label && (
          <label className={labelClass}>
            {label} &nbsp;
            {required && <span>*</span>}
          </label>
        )}
        {textarea ? (
          <textarea {...inputProps} className={`${mergedClassName}`} />
        ) : (
          <input {...inputProps} className={`${mergedClassName} `} />
        )}
        {errors && name && errors[name] && (
          <p className="text-red-500 m-0 p-0 text-sm">{`${errors[name].message}`}</p>
        )}
      </div>
    </>
  );
};

export default TextField;
