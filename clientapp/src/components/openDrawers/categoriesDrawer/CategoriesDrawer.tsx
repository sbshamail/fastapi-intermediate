'use client';
import React, { FC, useState } from 'react';
import { ChildrenTypes } from '@/utils/interfaces/commonTypes';
import Drawer from '@/components/@cui/drawer/Drawer';
import ListDropdown from '@/components/@cui/dropDown/ListDropdown';
import { CategoryDataType } from '@/utils/interfaces/schemaTypes';

interface Props extends ChildrenTypes {
  categories: CategoryDataType[];
}
const CategoriesDrawer: FC<Props> = ({ children, categories }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <div className="cursor-pointer">{children}</div>
      </div>
      <Drawer open={open} close={() => setOpen(false)} position="left">
        <div>
          <h1 className="p-2 text-primary text-lg text-center">Categories</h1>
        </div>
        <div className="mt-6">
          <div className="flex flex-col items-center space-y-4">
            <ListDropdown data={categories} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CategoriesDrawer;
