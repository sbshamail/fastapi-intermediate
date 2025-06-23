import React, { FC } from 'react';
import AdminSearchbar from '@/components/action/searchbar/AdminSearchbar';
import Account from '@/components/action/account/Account';
import { UserType } from '@/utils/interfaces/responseTypes/responseTypes';
import Notification from '@/components/action/notification/Notification';
import ToggleMode from '../../themeToggle/ToggleMode';
interface Props {
  user: UserType;
  isAuth: boolean;
}
const HeaderDashboard: FC<Props> = ({ user, isAuth }) => {
  return (
    <div className="flex items-center justify-between me-10">
      <div className="w-1/2">
        <AdminSearchbar />
      </div>
      <div className="flex items-center space-x-4">
        <Account user={user} isAuth={isAuth} />
        <Notification />
        <ToggleMode
          darkIcon={'line-md:sunny-filled'}
          lightIcon={'line-md:sunny-outline'}
        />
      </div>
    </div>
  );
};

export default HeaderDashboard;
