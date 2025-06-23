import { Dispatch } from '@reduxjs/toolkit';
import { ToastPosition } from 'react-hot-toast';
interface FetchType {
  route: string;
  dispatch?: Dispatch;
  fetchData?: any;
  app?: 'authapp' | 'productapp';
  position?: ToastPosition;
}
interface DataType extends FetchType {
  data: Record<string, any>;
}
export interface GetType extends FetchType {
  revalidate?: number | undefined;
  token?: string;
}
export interface PostType extends DataType {
  reset: () => void;
  removeSelection: () => void;
  pickValues?: string[];
  toastMsg?: string;
}
export interface PutType extends DataType {}
export interface RemoveType extends FetchType {}
export interface RemoveAllType extends FetchType {}
