import { ClassNameTypes } from '../interfaces/commonTypes';
interface Menus extends ClassNameTypes {
  name: string;
  link: string;
}
export const menusList: Menus[] = [
  { name: 'Home', link: '/' },
  { name: 'Shop', link: '/product' },
  { name: 'About Us', link: '/about-us' },
  { name: 'Blogs', link: '/blogs' },
  { name: 'Privacy Policy', link: '/category/metal' },
];
