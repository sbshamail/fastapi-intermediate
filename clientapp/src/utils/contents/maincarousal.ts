export interface CarousalDataType {
  id: number;
  title: string;
  link: string;
  image: string;
}

export const carousalData: CarousalDataType[] = [
  {
    id: 1,
    title: 'Clothes',
    link: '/product?categories=Clothes',
    image: '/images/banner-2.jpg',
  },
  {
    id: 2,
    title: 'Electronics',
    link: '/product?categories=Electronics',
    image: '/images/banner-3.jpg',
  },
  {
    id: 3,
    title: 'Furniture',
    link: '/product?categories=Furniture',
    image: '/images/banner-4.jpg',
  },
  {
    id: 4,
    title: 'Shoes',
    link: '/product?categories=Shoes',
    image: '/images/banner-1.jpg',
  },
];
