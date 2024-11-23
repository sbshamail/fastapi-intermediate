'use client';
import React from 'react';
import Button from '../../button';

interface Props {
  quantity: number;
  remove: () => void;
  add: () => void;
}
const AddRemoveQuantity = ({ quantity, remove, add }: Props) => {
  return (
    <div className="flex space-x-2 items-center text-[0.9em] font-bold">
      <Button
        onClick={remove}
        variant="secondary"
        className="cursor-pointer rounded-full p-1  flex items-center justify-center w-6 h-6"
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        onClick={add}
        variant="secondary"
        className="cursor-pointer rounded-full  p-1  flex items-center justify-center w-6 h-6"
      >
        +
      </Button>
    </div>
  );
};

export default AddRemoveQuantity;
