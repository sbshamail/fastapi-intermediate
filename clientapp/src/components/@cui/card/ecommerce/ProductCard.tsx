import React, { FC } from 'react';
import Card from '@/@core/tag/Card';
import { CustomLink } from '@/@core/tag/CustomLink';
//ecommerce common component
import { MouseLeaveEnterImage } from '../../ecommerce-component/MouseLeaveEnterImage';
import { ProductTags } from '../../ecommerce-component/ProductTags';
import StarRating from '../../ecommerce-component/starRating';
import { PriceAndSalePrice } from '../../ecommerce-component/PriceAndSalePrice';
import { ProductCartButton } from '../../ecommerce-component/ProductCartButton';
import { ProductFavorite } from '../../ecommerce-component/ProductFavorite';
import ProductViewButton from '@cui/ecommerce-component/ProductViewButton';
import SimilarProductButton from '@cui/ecommerce-component/SimilarProductButton';
//func
import { titleSubstring } from '@/@core/utils/helperFunctions';

// Main
interface Props {
  title: string;
  link?: string;
  images: string[];
  rating?: number;
  price: number;
  salePrice?: number;
  showPercentage?: boolean;
  ShowTags?: () => React.ReactNode;
  CartButton: () => React.ReactNode;
}
const ProductCard: FC<Props> = ({
  title,
  link,
  images,
  rating,
  price,
  salePrice,
  showPercentage = false,
  ShowTags,
  CartButton,
}) => {
  return (
    <CustomLink href={link ?? '#'} className="z-0">
      <Card space="0" className=" bordering cursor-pointer relative">
        <div>
          <div className="relative transition duration-300">
            <MouseLeaveEnterImage images={images} title={title} />
            {/* Tags */}

            <div className="absolute  left-0 top-0 mt-3">
              {ShowTags ? ShowTags() : <ProductTags title={'Sale'} />}
            </div>

            <div className="absolute right-0 top-0 m-2 z-10 ">
              <div className="flex space-x-1 ">
                <ProductViewButton />
                <SimilarProductButton />
                <ProductFavorite />
              </div>
            </div>
          </div>
          <div className="p-2">
            <h2 className="m-0 p-0 text-sm">{titleSubstring(title)}</h2>
            <div className="w-full flex items-center justify-between ">
              <div className="w-full flex flex-col mt-2 space-y-2">
                <div>
                  <StarRating averageRating={rating} disabled />
                </div>
                <div className="w-full flex justify-between">
                  <PriceAndSalePrice
                    price={price}
                    salePrice={salePrice}
                    showPercentage={showPercentage}
                  />
                </div>
              </div>
              <div className="z-10">
                {CartButton ? CartButton() : <ProductCartButton />}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </CustomLink>
  );
};

export default ProductCard;
