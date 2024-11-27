import { type NextRequest } from 'next/server';
import { readCart, writeCart } from '@/utils/backendFunction';

interface ParamsType {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: any) {
  const id = (await params).id;
  try {
    const cart = await readCart('cart.json');
    const updatedCart = cart.filter((item) => item.id.toString() !== id);
    await writeCart(updatedCart, 'cart.json');
    return new Response(JSON.stringify(updatedCart), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Error deleting cart item'), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, { params }: any) {
  const id = (await params).id;
  try {
    const cart = await readCart('cart.json');
    const product = cart.find((product) => product.id.toString() === id);
    if (!product) {
      return new Response(JSON.stringify('Product not found in cart'), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(product));
  } catch (error) {
    return new Response(JSON.stringify('Product not found in cart'), {
      status: 500,
    });
  }
}
