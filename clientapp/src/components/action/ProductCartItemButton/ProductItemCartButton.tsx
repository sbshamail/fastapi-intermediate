'use client';
import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks/hooks';
import { ProductDataType } from '@/utils/interfaces/responseTypes/responseTypes';
import { CartDataType } from '@/lib/store/interfaces';

// action
import { fetchPost } from '@/utils/action/function';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { setReducer } from '@/lib/store/common/action-reducer';
//
import { ProductCartButton } from '@cui/ecommerce-component/ProductCartButton';
interface Props {
  item: ProductDataType;
  children?: React.ReactNode;
}
export const ProductItemCartButton: FC<Props> = ({ item, children }) => {
  const dispatch = useAppDispatch();
  const [cartData, setCartData] = useState<CartDataType[]>([]);
  const setCart = setReducer('cart');
  const handlePostCart = async (item: any) => {
    const res: any = await fetchPost({
      data: item,
      route: `cart`,
      dispatch,
      fetchData: setCart,
    });
    if (res?.data) {
      setCartData(res.data);
    }
  };
  const data: CartDataType[] = useAppSelector((state) => state.cart.data) ?? [];
  useEffect(() => {
    setCartData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartQuantity = cartData?.find(
    (cartItem: any) => cartItem.id === item.id
  )?.quantity;
  return !children ? (
    <ProductCartButton
      handlePostCart={() => handlePostCart(item)}
      cartQuantity={cartQuantity}
    />
  ) : (
    <ProductCartButton handlePostCart={() => handlePostCart(item)}>
      {children}
    </ProductCartButton>
  );
};
