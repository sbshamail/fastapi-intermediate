import { CartDataType } from '@/lib/store/interfaces';
import fs from 'fs';
import path from 'path';

export const readCart = async (
  filename: string,
  filepath?: string
): Promise<CartDataType[]> => {
  const filePath = path.join(
    process.cwd(),
    filepath ?? 'src/utils/contents',
    filename
  );
  return new Promise((resolve) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        // If file read error, resolve with an empty array
        return resolve([]);
      }
      try {
        resolve(JSON.parse(data));
      } catch (parseError: any) {
        resolve([]);
      }
    });
  });
};

export const writeCart = async (
  cart: CartDataType[],
  filename: string,
  filepath?: string
): Promise<void> => {
  const filePath = path.join(
    process.cwd(),
    filepath ?? 'src/utils/contents',
    filename
  );
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(cart, null, 2), (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
