import { ProductDataType } from '@/utils/interfaces/responseTypes/responseTypes';

export interface CartDataType extends ProductDataType {
  quantity: number;
}
