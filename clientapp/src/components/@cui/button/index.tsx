import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
type className = string;
// Define your base button classes and specific variant classes
const baseButtonClasses =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ';

const primaryClasses: className =
  'bg-primary text-primary-foreground hover:bg-primary/90 duration-150';
const secondaryClasses: className =
  'bg-secondary text-secondary-foreground hover:bg-secondary/80 duration-150';
const dangerClasses: className =
  'bg-destructive text-destructive-foreground hover:bg-destructive/80 duration-150';
const successClasses: className =
  'bg-green-600 text-primary-foreground hover:bg-green-500 duration-150';
const warningClasses: className =
  'bg-amber-600 text-primary-foreground hover:bg-amber-600/90 duration-150';

// Utility function to get the merged classes for a button variant
const getButtonClasses = (
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
) => {
  switch (variant) {
    case 'primary':
      return twMerge(baseButtonClasses, primaryClasses);
    case 'secondary':
      return twMerge(baseButtonClasses, secondaryClasses);
    case 'danger':
      return twMerge(baseButtonClasses, dangerClasses);
    case 'success':
      return twMerge(baseButtonClasses, successClasses);
    case 'warning':
      return twMerge(baseButtonClasses, warningClasses);
    default:
      return baseButtonClasses;
  }
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  props?: React.ComponentPropsWithoutRef<'button'>;
  size?: '1' | '2' | '3';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

const Button: FC<Props> = ({
  children,
  className,
  size = '2',
  variant = 'primary',
  ...props
}) => {
  let sizeClassName = '';
  if (size === '1') {
    sizeClassName = 'px-4 !p-1';
  } else if (size === '2') {
    sizeClassName = 'px-4 !p-2';
  } else if (size === '3') {
    sizeClassName = 'px-4 py-3';
  }
  return (
    <div>
      <button
        className={` ${twMerge(
          `${getButtonClasses(variant)} ${sizeClassName}`,
          `${className}`
        )} `}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
