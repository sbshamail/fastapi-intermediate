import { Dispatch } from '@reduxjs/toolkit';

interface FetchType {
  route: string;
  dispatch?: Dispatch;
  fetchData?: any;
}
interface DataType extends FetchType {
  data: any;
}
export interface GetType extends FetchType {
  revalidate?: number | undefined;
}
export interface PostType extends DataType {}
export interface PutType extends DataType {}
export interface RemoveType extends FetchType {}
export interface RemoveAllType extends FetchType {}
