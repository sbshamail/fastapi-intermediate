import { type NextRequest } from 'next/server';
import { CartDataType } from '@/lib/store/interfaces';
import { readCart, writeCart } from '@/utils/backendFunction';

export async function GET(req: NextRequest) {
  try {
    const cart = await readCart('cart.json');
    return new Response(JSON.stringify(cart));
  } catch (error) {
    return new Response('Error Getting Cart', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let data: CartDataType[] = [];
    const product = await req.json();
    const cart = await readCart('cart.json');
    const existingCartItem = cart.find((item) => {
      return item.id === product.id;
    });
    if (!product.quota || product.quota === 0) {
      return new Response(JSON.stringify({ error: 'out of stock' }), {
        status: 400,
      });
    }
    const quota = product.quota;
    if (existingCartItem) {
      if (existingCartItem.quantity < quota) {
        const exist = cart.map((item) => {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
        data = exist;
      } else {
        data = [...cart]; // If the quantity is at quota, keep the cart unchanged
      }
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      data = newCart;
    }
    await writeCart(data, 'cart.json');
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response('Error saving cart', { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    let data: CartDataType[] = [];
    const updatedItem = await req.json();
    const cart = await readCart('cart.json');
    const count = updatedItem.quantity > 0 ? updatedItem.quantity - 1 : 1;
    if (count > 0) {
      const updateCart = cart.map((item: CartDataType) => {
        return item.id === updatedItem.id ? { ...item, quantity: count } : item;
      });
      data = updateCart;
    } else {
      data = cart;
    }

    await writeCart(data, 'cart.json');
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response('Error updating cart', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await writeCart([], 'cart.json');
    return new Response(JSON.stringify([]), { status: 200 });
  } catch (error) {
    return new Response('Error deleting cart', { status: 500 });
  }
}
