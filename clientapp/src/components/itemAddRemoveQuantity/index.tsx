'use client';
import React from 'react';
import AddRemoveQuantity from '../@cui/ecommerce-component/AddRemoveQuantity';
import { CartDataType } from '@/lib/store/interfaces';
// import { useAppDispatch } from '@/lib/store/hooks/hooks';
// import { post, put } from '@/utils/action/function';
// import { setReducer } from '@/lib/store/common/action-reducer';

const ItemAddRemoveQuantity = ({ item }: { item: CartDataType }) => {
  // const dispatch = useAppDispatch();
  // const setCart = setReducer('cart');

  const handlePostCart = async (item: any) => {
    // const res = await post({
    //   data: item,
    //   route: `cart`,
    //   dispatch: dispatch,
    //   fetchData: setCart,
    // });
  };
  const handleUpdateCart = async (item: any) => {
    // const res = await put({
    //   data: item,
    //   route: `cart`,
    //   dispatch: dispatch,
    //   fetchData: setCart,
    // });
  };
  return (
    <AddRemoveQuantity
      add={() => handlePostCart(item)}
      remove={() => handleUpdateCart(item)}
      quantity={item.quantity}
    />
  );
};

export default ItemAddRemoveQuantity;
