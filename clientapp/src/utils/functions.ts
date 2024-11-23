import { currencyFormatter } from '@/@core/utils/helperFunctions';
import { seoTitle } from '@/@core/utils/helperFunctions';
import { format } from 'date-fns';

export const currency = (amount: number) => {
  return currencyFormatter(amount, 'PKR', 'en-PK') + '.00';
};

export const generateSlug = (title: string, id: number | string) => {
  return `${seoTitle(title)}-${id}`;
};

export const formatDate = (date: Date, formatting: string = 'dd-MM-yyyy') => {
  return format(date, formatting);
};
