import React, { FC } from 'react';
import Screen from '@/utils/overlayer';
import Iconify from '@/@core/common/icon';
import { Space } from '@/utils/overlayer';
// component
import { PriceAndSalePrice } from '@/components/@cui/ecommerce-component/PriceAndSalePrice';
import StarRating from '@/components/@cui/ecommerce-component/starRating';
import { ProductItemCartButton } from '@/components/action/ProductCartItemButton/ProductItemCartButton';
import { ProductFavorite } from '@/components/@cui/ecommerce-component/ProductFavorite';
import Button from '@/components/@cui/button';
import SocialIcons from '@/components/action/SocialIcons/SocialIcons';
import BorderLineTitle from '@/components/@cui/ecommerce-component/BorderLineTitle';
import ReviewCard from '@/components/@cui/card/ReviewCard';
import { reviewsList } from '@/utils/contents/reviewsList';
// action
import { getData } from '@/utils/action/function';
// interfaces
import { CartDataType } from '@/lib/store/interfaces';
// import { SlugParamsType } from '@/utils/interfaces/commonTypes';
import RelatedProductContainer from '@/components/container/RelatedProductContainer';
import SwiperImageCard from '@/components/@cui/card/ecommerce/SwiperImageCard';

interface SlugParamsType {
  slug: string;
}

// interface Props {
//   params: SlugParamsType;
// }

const page: FC<{ params: SlugParamsType }> = async ({ params }) => {
  const { slug } = await params;
  const lastHyphenIndex = slug.lastIndexOf('-');
  // Extract the ID part of the slug after the last hyphen
  const encodedString = slug.substring(lastHyphenIndex + 1);
  const id = decodeURIComponent(encodedString);
  // Example data fetching
  const cart = await getData({ route: `cart/${id}` });
  const product = !cart && (await getData({ route: `product/${id}` }));
  const item: CartDataType = cart ? cart : product;
  return (
    <div>
      {item ? (
        <Screen>
          <Space>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-0 justify-between">
              <SwiperImageCard images={item.images} title={item.title} />
              <div className="flex flex-col space-y-4 mt-8 md:mt-0">
                <div className="flex flex-col">
                  <PriceAndSalePrice
                    pClass={'text-2xl'}
                    lpClass="text-xl"
                    price={item.price}
                    salePrice={item.salePrice}
                    showPercentage={true}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">
                    {item.title.substring(0, 160)}
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <StarRating averageRating={item.rating} disabled />
                  {item.reviews && (
                    <span className="">{`(${item?.reviews})`}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Iconify icon="material-symbols-light:shield-outline" />
                    <h6 className="m-0 p-0">7 Days Return Policy</h6>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Iconify icon="carbon:delivery" />
                    <h6 className="m-0 p-0"> Cash on Delivery available</h6>
                  </div>
                </div>
                <div className="p-2 border-t border-b border-border">
                  <div className="flex space-x-2 items-center">
                    <ProductItemCartButton item={item}>
                      <Button>
                        Add to Cart
                        <Iconify
                          icon="flowbite:cart-plus-outline"
                          className="text-primary-foreground"
                        />
                      </Button>
                    </ProductItemCartButton>
                    <ProductFavorite />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {item.sku && (
                    <div className="flex space-x-2 items-center">
                      <h6 className="text-muted-foreground">SKU: </h6>
                      <p className="m-0 p-0">{item.sku}</p>
                    </div>
                  )}
                  <div className="flex space-x-2 items-center">
                    <h6 className="text-muted-foreground">Category: </h6>
                    <p className="m-0 p-0">{item.category.name}</p>
                  </div>
                  {item.weight && (
                    <div className="flex space-x-2 items-center">
                      <h6 className="text-muted-foreground">Weight: </h6>
                      <p className="m-0 p-0">{item.weight}</p>
                    </div>
                  )}
                  <div className="flex space-x-2 items-center">
                    <h6 className="text-muted-foreground">Stock: </h6>
                    <p className="m-0 p-0">
                      {(item.quota ?? 0) < 3 ? 'Low in Stock' : 'In Stock'}
                    </p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h6 className="text-muted-foreground">Share: </h6>
                    <SocialIcons />
                  </div>
                </div>
              </div>
            </div>
            {/* Desription */}
            <div>
              <BorderLineTitle tabs={['description', 'reviews']}>
                <div id="description-tab">{item.description}</div>
                <div id="reviews-tab">
                  <div className="space-y-4">
                    {reviewsList.map((item) => (
                      <ReviewCard
                        key={item.id}
                        date={item.date}
                        rating={item.rating}
                        username={item.user.username}
                        description={item.description}
                      />
                    ))}
                  </div>
                </div>
              </BorderLineTitle>
            </div>
            <span className="mt-12" />
            <div className=" w-auto h-[2px]  bg-muted-foreground/30"></div>
            <div className="space-y-4">
              <h1 className="text-2xl">Related Products</h1>
              <RelatedProductContainer item={item} />
            </div>
          </Space>
        </Screen>
      ) : null}
    </div>
  );
};

export default page;
