'use client';
import React, { useEffect, useState } from 'react';
import Screen from '@/app/overlayer';
import { useAppSelector } from '@/lib/store/hooks/hooks';

import { CartDataType } from '@/lib/store/interfaces';
import { currency } from '@/utils/helper';

import Button from '@/components/@cui/button';
import DesktopCartScreen from '@/components/cartScreen/DesktopCartScreen';
import MobileCartScreen from '@/components/cartScreen/MobileCartScreen';
import { FixedBottomBar } from '@/components/@cui/layout/fixedBottomBar';
import MobileBottomFixed from '@/components/layout/mobileBottomFixed/MobileBottomFixed';
// action
import { fetchPost, put, remove, fetchGet } from '@/utils/action/function';
import { useAppDispatch } from '@/lib/store/hooks/hooks';

import { setReducer } from '@/lib/store/common/action-reducer';
const Cart = () => {
  const [selectedItems, setSelectedItems] = useState<CartDataType[]>([]);
  const setCart = setReducer('cart');
  const dispatch = useAppDispatch();

  //   console.log(selectedItems);
  const data: any = useAppSelector((state) => state.cart.data);

  // useEffect(() => {
  //   if (data?.length === 0) {
  //     const data = async () => {
  //       const res = await fetchGet({
  //         route: 'cart',
  //         fetchData: setCart,
  //         dispatch,
  //       });
  //     };
  //     data();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const totalPrice = selectedItems.reduce(
    (acum, item) => acum + (item.salePrice ?? item.price) * item.quantity,
    0
  );
  const handleCheckboxChange = (item: CartDataType) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i.id !== item.id)
        : [...prevSelected, item]
    );
  };
  const handleAllSelected = () => {
    const allSelected = selectedItems.length === data.length;
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data);
    }
  };

  useEffect(() => {
    const updatedSelectedItems = selectedItems.map((selectedItem) => {
      const matchingItem = data.find(
        (item: any) => item.id === selectedItem.id
      );
      return matchingItem ? matchingItem : selectedItem;
    });
    setSelectedItems(updatedSelectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const checkboxAll = () => (
    <div className="flex items-center space-x-2">
      <input
        className={`cursor-pointer checkbox `}
        type="checkbox"
        checked={selectedItems.length === data.length}
        onChange={handleAllSelected}
      />
      <p className="p-0 m-0"> All</p>
    </div>
  );
  const checkboxSingle = (item: CartDataType) => (
    <input
      className={`cursor-pointer checkbox `}
      type="checkbox"
      checked={selectedItems.some((selected) => selected.id === item.id)}
      onChange={() => handleCheckboxChange(item)}
    />
  );

  // cart action
  const handlePostCart = async (item: any) => {
    const res = await fetchPost({
      data: item,
      route: `cart`,
      dispatch: dispatch,
      fetchData: setCart,
    });
  };
  const handleUpdateCart = async (item: any) => {
    const res = await put({
      data: item,
      route: `cart`,
      dispatch: dispatch,
      fetchData: setCart,
    });
  };
  const handleRemoveCart = async (item: any) => {
    const res = await remove({
      route: `cart/${item.id}`,
      fetchData: setCart,
      dispatch,
    });
  };
  return (
    <div>
      {data?.length > 0 ? (
        <>
          <Screen>
            <DesktopCartScreen
              checkboxSingle={checkboxSingle}
              data={data}
              checkboxAll={checkboxAll}
              totalPrice={totalPrice}
              handlePostCart={handlePostCart}
              handleUpdateCart={handleUpdateCart}
              handleRemoveCart={handleRemoveCart}
            />
            <MobileCartScreen
              checkboxSingle={checkboxSingle}
              data={data}
              handleCheckboxChange={handleCheckboxChange}
              selectedItems={selectedItems}
              handlePostCart={handlePostCart}
              handleUpdateCart={handleUpdateCart}
              handleRemoveCart={handleRemoveCart}
            />
          </Screen>
          <FixedBottomBar>
            <div className="w-full border-b border-border mb-2">
              <div className="flex justify-between items-center">
                {checkboxAll()}
                <div className="flex space-x-2">
                  <div>
                    <div className="flex">
                      <h4>Subtotal: &nbsp;</h4> {currency(totalPrice)}
                    </div>
                    <p className="m-0 p-0 text-[0.7em]">
                      Shipping: Free Shipping
                    </p>
                  </div>
                  <Button className="w-full">Checkout</Button>
                </div>
              </div>
            </div>
            <MobileBottomFixed />
          </FixedBottomBar>
        </>
      ) : (
        <h2>Cart is Empty</h2>
      )}
    </div>
  );
};

export default Cart;
