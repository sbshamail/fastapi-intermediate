import { currency } from '@/utils/functions';
import React, { FC } from 'react';
import { cn } from '@/lib/utils';

export const PriceAndSalePrice: FC<{
  price: number;
  salePrice?: number;
  showPercentage?: boolean;
  pClass?: React.ComponentProps<'div'>['className'];
  lpClass?: React.ComponentProps<'div'>['className'];
}> = ({ price, salePrice, showPercentage = false, pClass, lpClass }) =>
  salePrice ? (
    <div className="flex space-x-1 items-center ">
      <p className={`m-0 p-0 text-foreground/80 font-semibold ${pClass}`}>
        {currency(salePrice)}
      </p>
      <p
        className={cn(
          `m-0 mb-2 p-0 line-through text-[0.8em] text-muted-foreground, ${lpClass}`
        )}
      >
        {currency(price)}
      </p>
      {showPercentage && (
        <p className="m-0 p-0 text-primary/80 font-semibold text-sm">
          {Math.floor(((price - salePrice) / price) * 100)}% off
        </p>
      )}
    </div>
  ) : (
    <p className={`m-0 p-0 text-foreground/80 font-semibold ${pClass}`}>
      {currency(price)}
    </p>
  );
