'use client';
import HIdSelectField from '@/components/@cui/select/HIdSelectField';
import React, { useEffect, useState } from 'react';

const SortByPrice = () => {
  const [value, setValue] = useState(3);

  useEffect(() => {
    if (!value) {
      setValue(3);
    }
  }, [value]);
  const list = [
    { id: 1, name: 'Low to High' },
    { id: 2, name: 'High to Low' },
    { id: 3, name: 'Best Match' },
  ];
  return (
    <div className="flex items-center space-x-2">
      <h3 className="whitespace-nowrap text-lg md:text-xl">Sort By:</h3>

      <HIdSelectField
        value={value}
        setValue={setValue}
        list={list}
        closeIcon={false}
        size={12}
      />
    </div>
  );
};

export default SortByPrice;
