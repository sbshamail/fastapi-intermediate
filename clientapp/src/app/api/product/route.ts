// 20240721153445
// https://api.escuelajs.co/api/v1/products
import { type NextRequest } from 'next/server';
import { products } from '@/utils/contents/fakeProducts';
import { shuffleArray } from '@/@core/utils/helperFunctions';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // console.log(searchParams);
  const featured = searchParams.get('featured');
  const category = Number(searchParams.get('category'));
  const categories = searchParams.get('categories')
    ? searchParams.get('categories')?.split(',')
    : null;
  const searchTerm = searchParams.get('searchTerm');

  const id = Number(searchParams.get('id'));
  const limit = Number(searchParams.get('limit')) || 8; // Assuming limit is numeric
  const page = Number(searchParams.get('page')) || 0;
  const skip = limit * page;
  const end = skip + limit;
  if (featured) {
    const featuredProducts = products.filter((product) => product.featured);
    shuffleArray(featuredProducts);
    const randomlySelectedProducts = featuredProducts.slice(0, 4);
    return new Response(JSON.stringify(randomlySelectedProducts));
  }
  // related Product
  if (category) {
    const categoryProducts = products
      .filter((product) => product.category.id === category)
      .filter((product) => product.id !== id);
    shuffleArray(categoryProducts);
    const randomlySelectedProducts = categoryProducts.slice(0, limit);
    return new Response(JSON.stringify(randomlySelectedProducts));
  }

  //Filter Query Main Products List

  let filterProduct = products;
  console.log(searchTerm);

  if (categories || searchTerm) {
    if (categories && categories.length > 0) {
      filterProduct = filterProduct.filter((item) =>
        categories.includes(item.categoryLink)
      );
    }
    if (searchTerm) {
      filterProduct = filterProduct.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  const count = filterProduct.length;
  const paginationProduct = filterProduct.slice(skip, end);

  return new Response(JSON.stringify({ result: paginationProduct, count }));
}
