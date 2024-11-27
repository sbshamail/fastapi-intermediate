import { ClassNameTypes } from '@/utils/interfaces/commonTypes';
import React, { FC, useEffect, useState } from 'react';

interface Props extends ClassNameTypes {
  checked?: boolean;
  onChange?: (e: boolean) => void;
}
const Checkbox: FC<Props> = ({ checked = false, onChange, className }) => {
  const [check, setChecked] = useState<boolean>();
  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleChange = () => {
    // const newChecked = !check; // toggle the check state
    // setChecked(newChecked); // update local state
    if (onChange) {
      // onChange(newChecked)
      onChange(!checked);
    }
  };
  return (
    <input
      className={`cursor-pointer checkbox ${className} `}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default Checkbox;
