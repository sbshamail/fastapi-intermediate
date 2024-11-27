import { categoriesList } from '@/utils/contents/categoriesList';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify(categoriesList));
}
