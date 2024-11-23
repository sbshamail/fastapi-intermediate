import { menusList } from './menusList';
export interface DataType {
  name: string;
  link: string;
}

export interface FooterDataType {
  Menu?: DataType[];
  Categories?: DataType[];
  Support?: DataType[];
}

export const footerList: FooterDataType[] = [
  {
    Menu: menusList,
    Categories: [
      {
        name: 'Home Appliances',
        link: '#',
      },
      {
        name: 'Mobile & Tablet',
        link: '#',
      },
      {
        name: 'Camera',
        link: '#',
      },
      {
        name: 'Accessories',
        link: '#',
      },
      {
        name: 'Clothing',
        link: '#',
      },
      {
        name: 'Headphone',
        link: '#',
      },
    ],
    Support: [
      {
        name: 'Support Carrer',
        link: '#',
      },
      {
        name: '24h Service',
        link: '#',
      },
      {
        name: 'Quick Chat',
        link: '#',
      },
      {
        name: 'Whatsapp',
        link: '#',
      },
      {
        name: 'Support 24h',
        link: '#',
      },
    ],
  },
];
