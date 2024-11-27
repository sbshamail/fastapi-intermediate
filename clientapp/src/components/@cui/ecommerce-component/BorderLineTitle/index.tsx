'use client';

import React, { useState, useEffect } from 'react';

import useDivDimensionsMap from '@/@core/customHooks/useDivDimentionsMap';
import { ChildrenTypes } from '@/utils/interfaces/commonTypes';

interface ProductDetailsProps extends ChildrenTypes {
  tabs: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  tabs = ['Description', 'Reviews'],
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || '');
  const [underlineStyle, setUnderlineStyle] = useState<{
    width: string;
    left: string;
  }>({ width: '0px', left: '0px' });
  const { dimensions, refs } = useDivDimensionsMap();

  useEffect(() => {
    const updateUnderlineStyle = () => {
      const activeDimension = dimensions.get(activeTab);
      if (activeDimension) {
        setUnderlineStyle({
          width: `${activeDimension.offsetWidth}px`,
          left: `${activeDimension.offsetLeft}px`,
        });
      }
    };

    updateUnderlineStyle();
  }, [activeTab, dimensions]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="relative">
        <div className="w-full flex space-x-3 items-center">
          {tabs.map((tab) => (
            <h6
              key={tab}
              ref={(el) => {
                if (el) {
                  refs.current.set(tab, el);
                } else {
                  refs.current.delete(tab);
                }
              }}
              className={`p-2 cursor-pointer ${
                activeTab === tab ? 'text-primary' : 'text-gray-500'
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.toUpperCase()}
            </h6>
          ))}
        </div>
        <div className="relative w-full">
          <div
            className={`absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out`}
            style={{
              width: underlineStyle.width,
              left: underlineStyle.left,
              transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
            }}
          ></div>
          <div className="h-[0.5px] w-full bg-muted"></div>
        </div>
      </div>
      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <div
                style={{
                  marginTop: '16px',
                  display:
                    child.props.id === `${activeTab}-tab` ? 'block' : 'none',
                }}
              >
                {child}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
