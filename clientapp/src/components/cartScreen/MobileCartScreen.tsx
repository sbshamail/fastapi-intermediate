import Card from '@/@core/tag/Card';
import { CartDataType } from '@/lib/store/interfaces';
import Image from 'next/image';
import React, { FC, ReactNode } from 'react';
import { PriceAndSalePrice } from '../@cui/ecommerce-component/PriceAndSalePrice';
import AddRemoveQuantity from '../@cui/ecommerce-component/AddRemoveQuantity';
import ItemAddRemoveQuantity from '../itemAddRemoveQuantity';

interface Props {
  data: CartDataType[];
  selectedItems: CartDataType[];
  handleCheckboxChange: (item: CartDataType) => void;
  checkboxSingle: (item: CartDataType) => ReactNode;
  handlePostCart: (item: CartDataType) => void;
  handleUpdateCart: (item: CartDataType) => void;
  handleRemoveCart: (item: CartDataType) => void;
}
const MobileCartScreen: FC<Props> = ({
  data,
  selectedItems,
  handleCheckboxChange,
  checkboxSingle,
  handlePostCart,
  handleUpdateCart,
  handleRemoveCart,
}) => {
  return (
    <Card className=" md:hidden p-4">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex items-center border-b border-border space-x-2">
            <div>{checkboxSingle(item)}</div>
            <div className="w-full flex items-center space-x-4">
              <div>
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  height={50}
                  width={50}
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex flex-col text-[0.9em]">
                    <p className="m-0 p-0 ">{item.title}</p>
                    <PriceAndSalePrice
                      price={item.price}
                      salePrice={item.salePrice}
                    />
                  </div>
                  <div className="flex items-end space-x-2">
                    <ItemAddRemoveQuantity item={item} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default MobileCartScreen;
