'use client';
import Iconify from '@/@core/common/icon';
import Button from '@/components/@cui/button';
import Drawer from '@/components/@cui/drawer/Drawer';
import React, { useState } from 'react';
import ProductFilterSidebar from '@/components/sidebar/ProductFilterSidebar';
interface Props {
  categoriesList: string[];
  addQuery: any;
  removeQuery: () => void;
}
const ProductFilterDrawer = ({
  categoriesList = [],
  addQuery,
  removeQuery,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <Button>
          <Iconify icon="mdi:filter-outline" /> Filter
        </Button>
      </div>
      <Drawer open={open} close={() => setOpen(false)} position="left">
        <div className="pt-12 flex flex-col items-center space-y-4 px-12">
          <ProductFilterSidebar
            categoriesList={categoriesList}
            addQuery={addQuery}
            removeQuery={removeQuery}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default ProductFilterDrawer;
