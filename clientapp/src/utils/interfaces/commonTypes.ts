import React from 'react';

export type ChildrenTypes = {
  children: React.ReactNode;
};
export type ClassNameTypes = {
  className?: React.ComponentProps<'div'>['className'];
};

export type SlugParamsType = {
  slug: string;
};
