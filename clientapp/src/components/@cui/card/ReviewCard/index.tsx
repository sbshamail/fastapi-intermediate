import Iconify from '@/@core/common/icon';
import Image from 'next/image';
import React, { FC } from 'react';
import { format } from 'date-fns';
import StarRating from '../../ecommerce-component/starRating';
interface Props {
  rating: number;
  date: Date;
  username: string;
  userImage?: string;
  description?: string;
}

const ReviewCard: FC<Props> = ({
  rating,
  date = new Date(),
  username,
  userImage,
  description,
}) => {
  return (
    <div className="group">
      <div className="flex space-x-4 ">
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border">
          {userImage ? (
            <Image src={userImage} alt={username} width={500} height={500} />
          ) : (
            <Iconify icon="material-symbols:person" className="h-full w-full" />
          )}
        </div>
        <div className="w-full flex justify-between px-2">
          <div className="text-muted-foreground">
            <h4 className="text-foreground/90">{username}</h4>
            <p className="m-0 p-0">{format(date, 'MMMM d, yyyy')} </p>
            <p className="my-2 text-foreground/80">{description}</p>
          </div>
          <div>
            <StarRating averageRating={rating} disabled />
          </div>
        </div>
      </div>
      <div className="w-auto h-[1px] mx-10 bg-muted-foreground/10"></div>
    </div>
  );
};

export default ReviewCard;
