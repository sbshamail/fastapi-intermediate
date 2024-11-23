import { ProductDataType } from '@/utils/interfaces/schemaTypes';
import { CartDataType } from '../../interfaces';

export const Add_Item = (
  cartData: CartDataType[],
  payloadCartItem: ProductDataType
) => {
  const quota = payloadCartItem.quota ?? 0;
  const existingCartItem = cartData.find((item) => {
    return item.id === payloadCartItem.id;
  });
  if (existingCartItem) {
    if (existingCartItem.quantity < quota) {
      return cartData.map((item) => {
        return item.id === payloadCartItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    } else {
      return [...cartData]; // If the quantity is at quota, keep the cart unchanged
    }
  }

  return [...cartData, { ...payloadCartItem, quantity: 1 }];
};

export const Remove_Quantity = (
  cartData: CartDataType[],
  payloadCartItem: CartDataType
) => {
  const count = payloadCartItem.quantity > 0 ? payloadCartItem.quantity - 1 : 1;
  if (count > 0) {
    const updateCart = cartData.map((item: CartDataType) => {
      return item.id === payloadCartItem.id
        ? { ...item, quantity: count }
        : item;
    });
    return updateCart;
  }
  return cartData;
};

export const Delete_Item = (
  cartData: CartDataType[],
  payloadCartItem: CartDataType
) => {
  return cartData.filter((item) => {
    return item.id !== payloadCartItem.id;
  });
};
