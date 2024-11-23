import React, { FC } from 'react';
import { Icon, IconProps } from '@iconify/react';

interface props extends IconProps {
  icon: string;
  className?: React.ComponentProps<'div'>['className'];
  fontSize?: string;
}

const Iconify: FC<props> = ({
  icon,
  className,
  fontSize = '1.5em',
  ...rest
}) => {
  return (
    <Icon
      icon={icon}
      fontSize={fontSize}
      {...rest}
      className={`cursor-pointer text-foreground ${className}`}
    />
  );
};

export default Iconify;
