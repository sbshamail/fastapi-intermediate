import React from 'react';
import { ChildrenTypes, ClassNameTypes } from '../interfaces/commonTypes';

export const Screen: React.FC<ChildrenTypes> = ({ children }) => {
  return (
    <div>
      <div className={`mx-auto 2xl:max-w-[1400px] max-w-6xl px-2`}>
        {children}
      </div>
    </div>
  );
};

export default Screen;
interface SpaceType extends ChildrenTypes, ClassNameTypes {}

export const Space: React.FC<SpaceType> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col space-y-6 ${className} `} {...props}>
      {children}
    </div>
  );
};
