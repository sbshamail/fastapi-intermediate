import React, { FC } from 'react';
import ProductCard from '@cui/card/ecommerce/ProductCard';
import { ProductDataType } from '@/utils/interfaces/schemaTypes';
import { generateSlug } from '@/utils/functions';
import { ProductTags } from '@cui/ecommerce-component/ProductTags';
import { ProductItemCartButton } from '../action/ProductCartItemButton/ProductItemCartButton';
interface Props {
  item: ProductDataType;
}
const ProductItemCard: FC<Props> = ({ item }) => {
  const { id, title, images, price, salePrice, sale, rating } = item;
  const ShowTags = () => (
    <>
      {sale && <ProductTags title="Sale" />}
      <ProductTags title="New" className="bg-red-600 text-white" />
    </>
  );
  const CartButton = () => <ProductItemCartButton item={item} />;
  return (
    <>
      <ProductCard
        link={`/product/${generateSlug(title, id)}`}
        images={images}
        price={price}
        salePrice={salePrice}
        ShowTags={ShowTags}
        CartButton={CartButton}
        rating={rating}
        title={title}
      />
    </>
  );
};

export default ProductItemCard;
