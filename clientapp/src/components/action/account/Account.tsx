'use client';
import React, { FC, useState } from 'react';
import IconDropdown, { ContentItem } from '@cui/dropDown/IconDropdown';
import LoginModalCard from '@/components/@cui/modalsCard/LoginModalCard';
import { UserType } from '@/utils/interfaces/responseTypes/responseTypes';
import { logout } from '@/utils/action/function';

interface Props {
  user: UserType | undefined;
  isAuth: boolean;
}
const Account: FC<Props> = ({ user, isAuth }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = (b: boolean) => {
    setIsModalOpen(b);
  };
  const contents: ContentItem[] = isAuth
    ? [
        {
          title: 'My Account',
          icon: 'material-symbols:person-outline',
          click: () => console.log('My Account Clicked'),
        },
        {
          title: 'Logout',
          icon: 'material-symbols:logout',
          click: () => logout(),
        },
      ]
    : [
        {
          title: 'Login',
          icon: 'material-symbols:Login',
          click: () => handleModal(true),
        },
      ];
  const CustomIcon = () => (
    <div className="w-8 p-2 h-8 border border-primary/80 Transition hover:border-primary rounded-full flex items-center justify-center group select-none">
      <h1 className="text-lg text-primary/80 group-hover:text-primary">
        {user?.firstname?.substring(0, 1)}
      </h1>
    </div>
  );
  return (
    <>
      <LoginModalCard
        open={isModalOpen}
        closeModal={() => handleModal(false)}
      />
      <div className="flex">
        {user ? (
          <IconDropdown
            customIcon={CustomIcon}
            // title={isAuth && user ? user.firstname : ''}
            contents={contents}
            style="dropdown"
          />
        ) : (
          <IconDropdown
            icon="material-symbols:person-outline"
            contents={contents}
            style="dropdown"
          />
        )}
      </div>
    </>
  );
};

export default Account;
