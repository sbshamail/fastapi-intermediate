import React from 'react';
import { Screen } from '@/app/overlayer';
import ToggleMode from '../../@cui/themeToggle/ToggleMode';
import ToggleColor from '../../@cui/themeToggle/ToggleColor';
const Topbar = () => {
  const H1 = ({ children }: any) => (
    <h1 className="text-sm text-primary-foreground">{children}</h1>
  );
  return (
    <div>
      <div className="w-full  bg-primary text-primary-foreground">
        <Screen>
          <div className="flex relative justify-between items-center py-1">
            <H1>Welcome to Market</H1>
            <H1>Free Ground Shipping Over $250</H1>
            <div className="flex items-center flex-end space-x-2">
              <ToggleColor />
            </div>

            {/* <div className="absolute right-0 -bottom-full transform rotate-[-130deg]">
            
          </div>
          <div className="absolute left-0 -bottom-full transform rotate-[130deg]">
            <ToggleMode />
          </div> */}
          </div>
        </Screen>
      </div>
    </div>
  );
};

export default Topbar;
