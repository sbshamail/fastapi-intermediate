import React from 'react';
import CorouselBanner from '@/components/banner/CorouselBanner';
import ProductFeatureContainer from '@/components/container/ProductFeatureContainer';
const page = async () => {
  return (
    <div>
      <CorouselBanner />

      <ProductFeatureContainer />
    </div>
  );
};

export default page;
