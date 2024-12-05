'use client';
import React, { FC, useState } from 'react';
import IconDropdown, { ContentItem } from '@cui/dropDown/IconDropdown';
import LoginModalCard from '@/components/@cui/modalsCard/LoginModalCard';
import { UserType } from '@/utils/interfaces/responseTypes/responseTypes';

interface Props {
  user: UserType;
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
          click: () => console.log('Logout Clicked'),
        },
      ]
    : [
        {
          title: 'Login',
          icon: 'material-symbols:Login',
          click: () => handleModal(true),
        },
      ];
  return (
    <>
      <LoginModalCard
        open={isModalOpen}
        closeModal={() => handleModal(false)}
      />
      <div className="flex">
        <IconDropdown
          icon="material-symbols:person-outline"
          title={isAuth && user ? user.firstname : ''}
          contents={contents}
          style="dropdown"
        />
      </div>
    </>
  );
};

export default Account;
