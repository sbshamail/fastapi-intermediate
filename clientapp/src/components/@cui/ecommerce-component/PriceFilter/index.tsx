import React from 'react';
import TextField from '../../textField/TextField';
const PriceFilter = () => {
  return (
    <div className="flex items-center justify-center ">
      <TextField
        inputSize="0"
        maxlength={7}
        size={7}
        value="0"
        name="lowPrice"
        onChange={(e) => e.target.value}
      />
      <span>-</span>
      <TextField
        inputSize="0"
        maxlength={7}
        size={7}
        name="highPrice"
        value={'1000'}
        placeholder=""
        onChange={(e) => e.target.value}
      />
    </div>
  );
};

export default PriceFilter;
