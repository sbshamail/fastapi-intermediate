import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  props?: React.ComponentPropsWithoutRef<'div'>;
  className?: React.ComponentProps<'div'>['className'];
  children: React.ReactNode;
  space?: '0' | '1' | '2';
  style?: React.CSSProperties;
}
const Shadow = ({ children, className, space, style, ...props }: Props) => {
  let spacing = 'p-3';
  if (space === '0') {
    spacing = '!p-0 !py-0 !m-0';
  } else if (space === '1') {
    spacing = 'p-4 py-10';
  } else if (space === '2') {
    spacing = 'p-6 py-12';
  }
  const mergedClassName = twMerge(
    `backdrop-blur-md bg-accent/90 text-card-foreground shadow shadow-border ${spacing}`,
    className
  );
  return (
    <div className={`${mergedClassName}`} style={style} {...props}>
      {children}
    </div>
  );
};

export default Shadow;
