'use client';
import React, { FC } from 'react';
import Shadow from '@/@core/tag/Shadow';
import useScreenState from '@/@core/customHooks/useScreenState';
import SidebarDashboard from './sidebar';
import HeaderDashboard from './header';
import { UserType } from '@/utils/interfaces/responseTypes/responseTypes';
import ListDropdown from '../dropDown/ListDropdown';
import { ListDropdownDataType } from '@/utils/interfaces/cuiTypes';
import { ChildrenTypes } from '@/utils/interfaces/commonTypes';
interface DashboardProps extends ChildrenTypes {
  type?: 'fixed' | 'absolute';
  position?: 'right' | 'left';
  open?: boolean;
  user: UserType;
  isAuth: boolean;
  data: ListDropdownDataType[];
}
const Dashboard: FC<DashboardProps> = ({
  open = true,
  type = 'fixed',
  position = 'left',
  user,
  isAuth,
  data,
  children,
}) => {
  //defaultWidth means if below that sidebar close if up then sidebar open
  const { isOpen, toggleSidebar } = useScreenState({ open, defaultWidth: 976 });

  return (
    <div className={`w-full flex ${type === 'fixed' ? 'relative' : ''}`}>
      <div className="max-h-screen">
        <SidebarDashboard
          isOpen={isOpen}
          title="MH MARKET"
          type={type}
          position={position}
          toggleSidebar={toggleSidebar}
        >
          <ListDropdown data={data} />
        </SidebarDashboard>
      </div>

      <div
        className={`flex-1 transition-all duration-300  ${
          isOpen ? (position === 'left' ? 'ms-64' : 'me-64') : ''
        }`}
      >
        <div className="w-full h-full relative ">
          <Shadow className="p-0 py-4">
            <div className="ms-10 mt-0">
              <HeaderDashboard user={user} isAuth={isAuth} />
            </div>
          </Shadow>
          <div className="relative mt-10 ms-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
