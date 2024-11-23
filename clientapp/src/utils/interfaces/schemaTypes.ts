export interface CategoryDataType {
  [key: string]: any;
  icon?: string;
  name: string;
  link?: string;
  children?: CategoryDataType[];
}

export interface ProductDataType {
  id: number | string;
  title: string;
  price: number;
  salePrice?: number;
  featured?: boolean;
  quota?: number;
  sale?: boolean;
  description: string;
  images: string[];
  rating?: number;
  reviews?: number;
  creationAt?: string;
  updatedAt?: string;
  categoryLink: string;
  category: CategoryDataType;
  sku?: string;
  weight?: number; //weight in gram
}

export interface ReviewsDataType {
  id: number | string;
  productId: number | string;
  rating: number;
  date: Date;
  user: {
    id: number | string;
    username: string;
    image?: string;
  };
  description?: string;
}
