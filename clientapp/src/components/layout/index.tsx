// this Layout Component is should be server side
import React, { FC } from 'react';
import Navbar from './navbar/topNavbar/Navbar';
import Topbar from './topbar/Topbar';
import MidNavbar from './navbar/midNavbar/MidNavbar';
import { Space } from '@/utils/overlayer';
import Footer from '../@cui/footer/Footer';
import { footerList } from '@/utils/contents/footerList';
import Endbar from './endbar/Endbar';
import BackToTop from '../@cui/layout/backToTop';
import { FixedBottomBar } from '../@cui/layout/fixedBottomBar';
import MobileBottomFixed from './mobileBottomFixed/MobileBottomFixed';
import HeaderClientLayout from '../clientLayout/HeaderClientLayout';
import IfPathname from '@/@core/clientSideHandles/IfPathname';

interface Props {
  children: React.ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="">
        <HeaderClientLayout>
          <Navbar />
          <div className="pt-4 p-2 h-min  ">
            <MidNavbar />
          </div>
        </HeaderClientLayout>
        {/* main-content id is use for mobile FixedBottomBar space  */}
        <div id="main-content">
          <main>{children}</main>
          <IfPathname path="/cart" className="hidden md:block">
            <div className="m-0 p-0 pt-20">
              <Footer
                data={footerList}
                title="Market"
                description="Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made."
              />
              <Endbar />
            </div>
          </IfPathname>
        </div>

        <FixedBottomBar>
          <IfPathname path="/cart">
            <MobileBottomFixed />
          </IfPathname>
        </FixedBottomBar>
      </div>
      <BackToTop />
    </div>
  );
};

export default Layout;
