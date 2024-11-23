import Iconify from '@/@core/common/icon';
import React, { FC } from 'react';
interface Props {
  handlePostCart?: () => void;
  cartQuantity?: number;
  children?: React.ReactNode;
}
export const ProductCartButton: FC<Props> = ({
  handlePostCart,
  cartQuantity,
  children,
}) => {
  return (
    <div onClick={(e) => e.preventDefault()}>
      <div className="relative">
        <div onClick={handlePostCart}>
          {children ? (
            children
          ) : (
            <Iconify
              className={`text-primary hover:text-primary/80 `}
              icon="flowbite:cart-plus-outline"
              fontSize="2em"
            />
          )}
        </div>
        {!children && cartQuantity && cartQuantity > 0 ? (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-5">
            <span className="m-0 p-0.5 rounded-full text-[0.7em] select-none">
              {cartQuantity}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
