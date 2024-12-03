import { Screen } from '@/app/overlayer';
import React from 'react';
import { Menu } from '../../../@cui/link';
import { menusList } from '@/utils/contents/menusList';
import CategoriesDrawer from '@/components/openDrawers/categoriesDrawer/CategoriesDrawer';
import CateDropdown from '@/components/@cui/dropDown/CateDropdown';
import { categoriesTrigger } from './function';
import { getData } from '@/utils/action/function';
const MidNavbar = async () => {
  const categories = await getData({ route: 'category', revalidate: 3600 });

  // console.log(categories);

  return (
    <Screen>
      <div className="flex justify-between items-center">
        <div className="max-w-3/12">
          {/* small screen categories*/}
          <CategoriesDrawer categories={categories}>
            <div className="lg:hidden ">{categoriesTrigger()}</div>
          </CategoriesDrawer>
          {/* large screen categories*/}
          <div className="hidden lg:block">
            <CateDropdown contents={categories} />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex space-x-4 h-6">
            {menusList.map((menu, index) => (
              <React.Fragment key={index}>
                <Menu key={menu.name} name={menu.name} link={menu.link} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </Screen>
  );
};

export default MidNavbar;
