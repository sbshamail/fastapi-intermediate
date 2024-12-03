import { Dispatch } from '@reduxjs/toolkit';
import { ToastPosition } from 'react-hot-toast';
interface FetchType {
  route: string;
  dispatch?: Dispatch;
  fetchData?: any;
  app: 'authapp' | 'productapp';
  reset: () => void;
  removeSelection: () => void;
  position?: ToastPosition;
  pickValues?: string[];
}
interface DataType extends FetchType {
  data: Record<string, any>;
}
export interface GetType extends FetchType {
  revalidate?: number | undefined;
}
export interface PostType extends DataType {}
export interface PutType extends DataType {}
export interface RemoveType extends FetchType {}
export interface RemoveAllType extends FetchType {}
