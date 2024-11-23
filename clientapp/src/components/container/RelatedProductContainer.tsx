import React, { FC } from 'react';
import { getData } from '@/utils/action/function';
import { ProductDataType } from '@/utils/interfaces/schemaTypes';

import ProductItemCard from '../card/ProductItemCard';

const RelatedProductContainer: FC<{ item: ProductDataType }> = async ({
  item,
}) => {
  const { category, id } = item;
  const products = await getData({
    route: `product?id=${id}&category=${category.id}&limit=8`,
  });
  return (
    <div>
      <div className="w-full">
        <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-4">
          {products.map((item: ProductDataType, index: number) => {
            return <ProductItemCard key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedProductContainer;
