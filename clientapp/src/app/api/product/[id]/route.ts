import { type NextRequest } from 'next/server';
import { products } from '@/utils/contents/fakeProducts';

// interface paramsType {
//   params: { id: string };
// }

export async function GET(req: NextRequest, { params }: any) {
  const id = (await params).id;
  console.log(params.params.id);
  const product = products.find((product) => product.id.toString() === id);
  if (!product) {
    return new Response('Product not found', { status: 404 });
  }
  return new Response(JSON.stringify(product));
}
