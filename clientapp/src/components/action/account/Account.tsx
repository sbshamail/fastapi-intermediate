'use client';
import React from 'react';
import IconDropdown, { ContentItem } from '../../@cui/dropDown/IconDropdown';
const Account = () => {
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
  ];
  return (
    <div className="flex">
      <IconDropdown
        icon="material-symbols:person-outline"
        title="Muhammad"
        contents={contents}
        style="dropdown"
      />
    </div>
  );
};

export default Account;
