import { ListDropdownDataType } from '../interfaces/cuiTypes';

export const adminSidebarList: ListDropdownDataType[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: 'mdi:view-dashboard-outline',
    link: '/admin',
  },
  {
    id: 2,
    name: 'Catalog',
    icon: 'tabler:box',
    children: [
      {
        id: 21,
        name: 'Products',
        link: '/admin/product',
      },
      {
        id: 22,
        name: 'Categories',
        link: '/admin/category',
      },
    ],
  },
  {
    id: 3,
    name: 'Coupans',
    icon: 'mdi:money',
    link: '/admin/coupan',
  },
  {
    id: 4,
    name: 'Orders',
    icon: 'tabler:shopping-cart',
    link: '/admin/order',
  },
  {
    id: 5,
    name: 'Customers',
    icon: 'tabler:user',
    link: '/admin/customers',
  },
  {
    id: 6,
    name: 'Settings',
    icon: 'tabler:settings',
    children: [
      {
        id: 61,
        name: 'System', // theme, price, maintenance mood
        link: '/admin/setting/system',
      },
      {
        id: 62,
        name: 'Account',
        link: '/admin/setting/account',
      },
      {
        id: 63,
        name: 'Security',
        link: '/admin/setting/security',
      },
    ],
  },
];
