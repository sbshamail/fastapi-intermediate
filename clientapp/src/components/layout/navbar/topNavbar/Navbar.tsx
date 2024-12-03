import { Screen } from '@/app/overlayer';
import NavCartButton from '@/components/action/navCartButton/NavCartButton';
import RouteIcon from '@/components/action/RouteIcon/RouteIcon';
import Account from '@/components/action/account/Account';
import MenuDrawer from '@/components/openDrawers/menuDrawer/MenuDrawer';
import Iconify from '@/@core/common/icon';
import ToggleMode from '@/components/@cui/themeToggle/ToggleMode';
import BreadCrumbs from '@/components/@cui/breadcrumb';
import NavSearchbar from '@/components/action/searchbar/NavSearchbar';
import { Suspense } from 'react';

const toggleModesBulb = () => (
  <Screen>
    <div className="flex justify-between">
      <ToggleMode className="transform rotate-[130deg]" />
      <BreadCrumbs />
      <ToggleMode className="transform rotate-[-130deg]" />
    </div>
  </Screen>
);
const Navbar = () => {
  return (
    <div>
      {toggleModesBulb()}

      <div>
        <Screen>
          <div className="w-full flex items-center justify-between space-x-4 md:space-x-10">
            <div className="flex items-center">
              <div className="md:hidden">
                <MenuDrawer>
                  <Iconify
                    icon="material-symbols:menu"
                    fontSize={'1.5em'}
                    className=""
                  />
                </MenuDrawer>
              </div>
              <h1 className="hidden md:block text-3xl text-primary">MARKET</h1>
            </div>
            <div className="w-full ">
              <Suspense>
                <NavSearchbar />
              </Suspense>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2">
                <Account />
                <div>|</div>
              </div>
              <RouteIcon
                icon="mdi:heart-outline"
                className="hover:text-primary"
              />

              <div>|</div>
              <NavCartButton />
            </div>
          </div>
        </Screen>
      </div>
    </div>
  );
};

export default Navbar;
