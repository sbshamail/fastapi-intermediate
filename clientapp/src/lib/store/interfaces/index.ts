import { ProductDataType } from '@/utils/interfaces/schemaTypes';

export interface CartDataType extends ProductDataType {
  quantity: number;
}
