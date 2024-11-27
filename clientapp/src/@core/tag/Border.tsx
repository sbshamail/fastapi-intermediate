import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  props?: React.ComponentPropsWithoutRef<'div'>;
  className?: React.ComponentProps<'div'>['className'];
  children: React.ReactNode;
  space?: string;
}
const Border = ({ children, className, space, ...props }: Props) => {
  if (space === '1') {
    space = 'p-4 py-10';
  } else if (space === '2') {
    space = 'p-6 py-12';
  }
  const mergedClassName = twMerge(
    `bg-card rounded-lg text-card-foreground border border-border ${space}`,
    className
  );
  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
};

export default Border;
