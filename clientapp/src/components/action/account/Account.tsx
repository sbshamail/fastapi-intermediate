'use client';
import React, { useState } from 'react';
import IconDropdown, { ContentItem } from '@cui/dropDown/IconDropdown';
import LoginModalCard from '@/components/@cui/modalsCard/LoginModalCard';
const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = (b: boolean) => {
    setIsModalOpen(b);
  };
  const contents: ContentItem[] = [
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
          title="Muhammad"
          contents={contents}
          style="dropdown"
        />
      </div>
    </>
  );
};

export default Account;
