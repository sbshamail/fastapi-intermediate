'use client';
import { useState } from 'react';
import Iconify from '@/@core/common/icon';

const getStarIcon = (rating: number, index: number) => {
  const fullStarThreshold = index;
  const quarterStarThreshold = index - 0.75;
  const halfStarThreshold = index - 0.5;
  const threeQuarterStarThreshold = index - 0.25;

  if (rating >= fullStarThreshold) {
    return 'fluent:star-28-filled';
  } else if (
    rating >= threeQuarterStarThreshold &&
    rating < fullStarThreshold
  ) {
    return 'fluent:star-three-quarter-28-regular';
  } else if (
    rating >= halfStarThreshold &&
    rating < threeQuarterStarThreshold
  ) {
    return 'fluent:star-half-28-regular';
  } else if (rating >= quarterStarThreshold && rating < halfStarThreshold) {
    return 'fluent:star-one-quarter-28-regular';
  } else {
    return 'fluent:star-28-regular';
  }
};

type StarRatingProps = {
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
  rating?: number;
  averageRating?: number;
  disabled?: boolean;
};

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onRatingChange,
  rating = 0,
  averageRating = 0,
  disabled = false,
}) => {
  const [hoverRating, setHoverRating] = useState(rating);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleMouseEnter = (index: number) => {
    if (!disabled) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!disabled) {
      setCurrentRating(index);
      if (onRatingChange) {
        onRatingChange(index);
      }
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const icon = getStarIcon(rating, i);
      //   const icon =
      //     i <= rating ? "fluent:star-28-filled" : "fluent:star-28-regular";

      stars.push(
        <Iconify
          key={i}
          fontSize="0.9em"
          className="text-yellow-500"
          icon={icon}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      {averageRating ? (
        <div className="flex">{renderStars(averageRating)}</div>
      ) : (
        <div className="flex">{renderStars(hoverRating || currentRating)}</div>
      )}
    </div>
  );
};

export default StarRating;

{
  /* <StarRating
totalStars={5}
rating={3}
averageRating={2.8}
onRatingChange={handleRating}
/> */
}
// backend calculate rating
// const calculateAverageRating = (ratings: number[]): number => {
//     if (ratings.length === 0) return 0;
//     const total = ratings.reduce((acc, rating) => acc + rating, 0);
//     return total / ratings.length;
//   };

//  {/* regular */}
//  <Iconify icon="fluent:star-28-regular" />
//  {/* half star */}
//  <Iconify icon="fluent:star-half-28-regular" />
//  {/* filled star */}
//  <Iconify icon="fluent:star-28-filled" />
//  {/* 3quarter-star */}
//  <Iconify icon="fluent:star-three-quarter-28-regular" />
//  {/* one quarter star */}
//  <Iconify icon="fluent:star-one-quarter-28-regular" />
