import Link from 'next/link';
import React, { ReactNode } from 'react';

export const CustomLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  key?: number | string;
  className?: React.ReactNode;
}) => (
  <Link
    href={href || '#'}
    className={`no-underline text-foreground bg-transparent ${className}`}
  >
    {children}
  </Link>
);
