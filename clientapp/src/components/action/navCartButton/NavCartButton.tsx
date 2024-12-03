'use client';
import React, { FC } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { CustomLink } from '@/@core/tag/CustomLink';

import Iconify from '@/@core/common/icon';
import { titleSubstring } from '@/@core/utils/helperFunctions';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';
import {
  PopOver,
  PopOverContent,
  PopOverTrigger,
} from '@/@core/common/popOver/PopOver';
import Shadow from '@/@core/tag/Shadow';
import Button from '../../@cui/button';
import { currency } from '@/utils/helper';
import { CartDataType } from '@/lib/store/interfaces';
// action
import { setReducer } from '@/lib/store/common/action-reducer';
import { remove } from '@/utils/action/function';
import { useAppDispatch } from '@/lib/store/hooks/hooks';

const NavCartButton: FC<ClassNameTypes> = ({ className }) => {
  const cartData: CartDataType[] =
    useAppSelector((state) => state.cart.data) ?? [];
  const setCart = setReducer('cart');
  const totalPrice = cartData?.reduce(
    (acum, item) => acum + (item.salePrice ?? item.price) * item.quantity,
    0
  );
  const dispatch = useAppDispatch();
  const handleRemoveCartItem = async (item: any) => {
    const res = await remove({
      route: `cart/${item.id}`,
      fetchData: setCart,
      dispatch,
    });
  };

  return (
    <CustomLink href="/cart">
      <PopOver style="dropdown" mouseTrigger={true}>
        <PopOverTrigger>
          <div className="relative">
            <Iconify
              icon="fe:cart"
              className={`text-3xl hover:text-primary ${className}`}
            />
            <div className="absolute top-1/2 right-0 -mt-6">
              <span className="m-0 p-[2px]   rounded-full border bg-primary font-bold text-primary-foreground text-[0.55em] text-center select-none">
                {cartData.length}
              </span>
            </div>
          </div>
        </PopOverTrigger>
        <PopOverContent>
          <Shadow
            space="0"
            className="w-full relative overflow-auto flex flex-col space-y-2"
          >
            <div className="max-h-[400px] overflow-auto p-2">
              {cartData.map((item: CartDataType, index) => (
                <div key={index} className=" max-w-1/3 p-2 px-4 shadow">
                  <div className="flex justify-between space-x-4">
                    <div className="flex space-x-3">
                      <Image
                        className="mx-auto rounded-lg m-0 "
                        src={item.images[0]}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                      <div className="flex flex-col">
                        <p className="m-0 p-0 text-sm">
                          {titleSubstring(item.title)}
                        </p>
                        <p className="m-0 p-0 text-sm ">
                          {item.quantity} x {item.salePrice ?? item.price}
                        </p>
                      </div>
                    </div>

                    <Iconify
                      onClick={() => handleRemoveCartItem(item)}
                      icon="material-symbols:close"
                      className="hover:text-red-500 Transition"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full p-2 px-4  ">
              <div className="flex justify-between">
                <span className="text-foreground/80 font-bold">Subtotal:</span>
                <span className="font-medium">{currency(totalPrice)}</span>
              </div>
              <div className="p-2 px-2 space-x-4 flex">
                <div className="w-full ">
                  <Button variant="secondary" className="w-full">
                    View Cart
                  </Button>
                </div>
                <div className="w-full">
                  <Button className="w-full">Checkout</Button>
                </div>
              </div>
            </div>
          </Shadow>
        </PopOverContent>
      </PopOver>
    </CustomLink>
  );
};

export default NavCartButton;
