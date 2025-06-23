export interface UserType {
  email: string;
  id: number;
  firstname: string;
  lastname: string | null;
  phone: string;
  role: {
    id: number;
    name: string;
    permissions: string[];
  };
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
  category: { id?: number | string; name: string };
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

export interface AuthResponseType {
  access_token: string;
  refresh_token: string;
  exp: string;
  user: {
    id: string;
    email: string;
    username: string;
    phone: string;
  };
}
