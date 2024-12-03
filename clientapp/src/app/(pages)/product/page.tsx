import React, { Suspense } from 'react';
import { Screen } from '@/app/overlayer';

import ProductPage from '@/_ClientPages/ProductPage';
// import { getData } from '@/utils/action/function';
//redux
const page = async () => {
  // const data = await getData({ route: 'product?limit=10' });
  return (
    <Screen>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductPage />
      </Suspense>
    </Screen>
  );
};

export default page;
