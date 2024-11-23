import React from 'react';

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
  return (
    <div
      className={`bg-card rounded-lg text-card-foreground border border-border ${space} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Border;
