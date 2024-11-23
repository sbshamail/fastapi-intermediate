'use client';
import React, { FC, useState } from 'react';
import Drawer from '../../@cui/drawer/Drawer';
import { ChildrenTypes } from '@/utils/interfaces/commonTypes';
import { Menu } from '../../@cui/link';
import { menusList } from '@/utils/contents/menusList';

const MenuDrawer: FC<ChildrenTypes> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Drawer open={open} close={() => setOpen(false)} position="left">
        <div>
          <h1 className=" p-2 text-lg text-primary">MARKET</h1>
          <h1 className=" text-lg text-center">Menus</h1>
        </div>
        <div className="mt-6">
          <div className="flex flex-col items-center space-y-4">
            {menusList.map((menu) => (
              <Menu
                key={menu.name}
                name={menu.name}
                link={menu.link}
                className="border-b hover:border-none"
              />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
