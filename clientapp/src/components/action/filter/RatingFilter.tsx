'use client';
import Iconify from '@/@core/common/icon';
import StarRating from '@/components/@cui/ecommerce-component/starRating';
import Checkbox from '@/components/@cui/textField/Checkbox';
import React, { useState, FC } from 'react';

const ratings = [3, 4, 5];

const RatingSelector: FC = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleCheckboxChange = (rating: number) => {
    // Update the selected rating
    if (rating === selectedRating) {
      setSelectedRating(null);
    } else {
      setSelectedRating(rating);
    }
  };

  return (
    <div>
      {ratings.map((rating) => (
        <div key={rating} className="flex justify-between items-center mb-2">
          <div className="flex space-x-4 items-center">
            <span>
              <Checkbox
                checked={selectedRating === rating}
                onChange={() => handleCheckboxChange(rating)}
                className="p-[6px]"
              />
            </span>
            <span>
              <StarRating rating={rating} disabled />
            </span>
          </div>
          <Iconify icon="weui:arrow-outlined" />
        </div>
      ))}
    </div>
  );
};

export default RatingSelector;
