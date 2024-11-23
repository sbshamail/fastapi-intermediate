import { Screen, Space } from '@/utils/overlayer';
import React from 'react';
import { ProductDataType } from '@/utils/interfaces/schemaTypes';
import ProductItemCard from '../card/ProductItemCard';
import { getData } from '@/utils/action/function';
const ProductFeatureContainer = async () => {
  const products = await getData({
    route: '/product?featured=true',
  });

  return (
    <div>
      <Screen>
        <Space>
          <h1 className="text-2xl">
            <span className="text-primary">:: </span>
            Exclusive Products<span className="text-primary"> ::</span>
          </h1>
          <div className="w-full">
            <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-4">
              {products &&
                products?.map((item: ProductDataType, index: number) => {
                  return <ProductItemCard key={index} item={item} />;
                })}
            </div>
          </div>
        </Space>
      </Screen>
    </div>
  );
};

export default ProductFeatureContainer;
