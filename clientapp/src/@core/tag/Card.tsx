import React from 'react';

interface Props {
  props?: React.ComponentPropsWithoutRef<'div'>;
  className?: React.ComponentProps<'div'>['className'];
  children: React.ReactNode;
  space?: '0' | '1' | '2';
}
const Card = ({ children, className, space, ...props }: Props) => {
  let spacing = 'p-1';
  if (space === '0') {
    spacing = '!p-0 !py-0 !m-0';
  } else if (space === '1') {
    spacing = 'p-4 py-10';
  } else if (space === '2') {
    spacing = 'p-6 py-12';
  }
  return (
    <div
      className={` bg-card text-card-foreground border-t-[0.1px]  border-border rounded-lg shadow shadow-border ${spacing}  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
