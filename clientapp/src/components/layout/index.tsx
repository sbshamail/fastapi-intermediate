// this Layout Component is should be server side
import React, { FC } from 'react';
import Navbar from './navbar/topNavbar/Navbar';
import MidNavbar from './navbar/midNavbar/MidNavbar';
import Footer from '../@cui/footer/Footer';
import { footerList } from '@/utils/contents/footerList';
import Endbar from './endbar/Endbar';
import BackToTop from '../@cui/layout/backToTop';
import { FixedBottomBar } from '../@cui/layout/fixedBottomBar';
import MobileBottomFixed from './mobileBottomFixed/MobileBottomFixed';
import HeaderClientLayout from '../clientLayout/HeaderClientLayout';
import IfPathname from '@/@core/clientSideHandles/IfPathname';
import { getCookie } from '@/utils/action/cookies';
import { IsAuth } from '@/utils/action/cookies';
import { UserType } from '@/utils/interfaces/responseTypes/responseTypes';

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = async ({ children }) => {
  const user: UserType = await getCookie('user');
  const isAuth: boolean = await IsAuth();

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <HeaderClientLayout>
            <Navbar user={user} isAuth={isAuth} />
            <div className="pt-4 p-2 h-min  ">
              <MidNavbar />
            </div>
          </HeaderClientLayout>
          {/* main-content id is use for mobile FixedBottomBar space  */}
          <div id="main-content">
            <main>{children}</main>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="m-0 p-0 pt-20 ">
            <Footer
              data={footerList}
              title="Market"
              description="Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made."
            />
          </div>
          <Endbar />
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
