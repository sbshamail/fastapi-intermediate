'use client';
import Card from '@/@core/tag/Card';
import { CartDataType } from '@/lib/store/interfaces';
import Image from 'next/image';
import React, { FC, ReactNode } from 'react';
import { PriceAndSalePrice } from '../@cui/ecommerce-component/PriceAndSalePrice';
import { currency } from '@/utils/functions';
import Iconify from '@/@core/common/icon';
import Button from '../@cui/button';
import ItemAddRemoveQuantity from '../itemAddRemoveQuantity';
interface Props {
  data: CartDataType[];
  checkboxAll: () => ReactNode;
  checkboxSingle: (item: CartDataType) => ReactNode;
  totalPrice: number;
  handlePostCart: (item: CartDataType) => void;
  handleUpdateCart: (item: CartDataType) => void;
  handleRemoveCart: (item: CartDataType) => void;
}
const DesktopCartScreen: FC<Props> = ({
  data,
  checkboxAll,
  checkboxSingle,
  totalPrice,
  handleRemoveCart,
}) => {
  return (
    <div className="hidden md:block space-y-6 lg:space-y-0 lg:flex lg:space-x-6 ">
      <Card className="w-full  lg:w-9/12 p-4 px-6">
        {checkboxAll()}
        <table className="p-0 m-0">
          <thead>
            {data.map((item: CartDataType, index: number) => (
              <tr key={index} className="m-0 border-b border-muted">
                <td>{checkboxSingle(item)}</td>
                <td>
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    height={50}
                    width={50}
                  />
                </td>
                {/* Title */}
                <td>
                  <div className="flex flex-col text-[0.9em]">
                    <p className="m-0 p-0 ">{item.title}</p>
                    <div className="flex space-x-2">
                      <span className="font-semibold">Unit</span>:{' '}
                      <span>{item.quantity}</span>
                    </div>
                  </div>
                </td>
                {/* Price */}
                <td>
                  <div className="flex flex-col">
                    <span className="font-semibold">Price</span>
                    <PriceAndSalePrice
                      price={item.price}
                      salePrice={item.salePrice}
                    />
                  </div>
                </td>
                {/* quantity */}
                <td>
                  <span className="font-semibold mb-1">Qty</span>
                  <ItemAddRemoveQuantity item={item} />
                </td>
                {/* Total */}
                <td>
                  <div className="flex flex-col text-[0.9em]">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      {currency(item.quantity * (item.salePrice ?? item.price))}
                    </span>
                  </div>
                </td>
                {/* Remove */}
                <td>
                  <Iconify
                    onClick={() => handleRemoveCart(item)}
                    icon="material-symbols:close"
                    className="hover:text-red-500 Transition"
                  />
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </Card>
      <Card className="w-full lg:w-3/12 h-max p-4 px-6">
        <div className="flex flex-col space-y-4">
          <h4>Cart Total</h4>
          <table className="m-0 p-0">
            <thead className="border-none">
              <tr className=" border-b border-border px-6 flex justify-between">
                <td className=" py-2">
                  <span>Sub total</span>
                </td>
                <td className="py-2">
                  <span>{currency(totalPrice)}</span>
                </td>
              </tr>
              <tr className="m-0 border-b border-border px-6 flex justify-between">
                <td className="py-2">Shipping</td>
                <td className="py-2 ">Fee Shipping</td>
              </tr>
              <tr className="m-0 border-b border-border px-6 flex justify-between">
                <td className="py-2">Total</td>
                <td className="py-2">
                  <span className="font-bold">{currency(totalPrice)}</span>
                </td>
              </tr>
            </thead>
          </table>
          <Button className="w-full">Checkout</Button>
        </div>
      </Card>
    </div>
  );
};

export default DesktopCartScreen;
