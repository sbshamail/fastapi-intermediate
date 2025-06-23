'use client';
import React, { FC, ReactNode, useState } from 'react';
import { CustomLink } from '@/@core/tag/CustomLink';
import Iconify from '@/@core/common/icon';
import { usePathname } from 'next/navigation';
import { ListDropdownDataType } from '@/utils/interfaces/cuiTypes';

interface itemComponentsProps {
  item: ListDropdownDataType;
  idName: string;
  isOpen: boolean;
  onClick: (str: string) => void;
  child?: boolean;
  children: ReactNode;
  pathname?: string | null;
  isChildMatch: boolean; //for parent
}
// link href is custom link
const ItemComponent: FC<itemComponentsProps> = ({
  item,
  idName,
  isOpen,
  onClick,
  children,
  pathname,
  isChildMatch,
}) => {
  let Container: any;
  if (item.link) {
    Container = CustomLink;
  } else {
    Container = 'div';
  }

  const isMatch = pathname === item.link || isChildMatch;

  // Prevent child clicks from closing the parent
  const handleItemClick = (e: React.MouseEvent) => {
    onClick(item[idName]);
    e.stopPropagation();
  };

  return (
    <Container href={item.link || '#'} className={`no-underline`}>
      <div
        className={`flex items-center justify-between p-2 cursor-pointer ${
          isOpen && !item.link ? 'bg-effect-md' : ''
        }
          ${pathname === item.link ? 'bg-effect-xl ' : 'bg-effect'}
             text-accent-foreground hover:bg-effect-xl
          `}
        onClick={(e) => handleItemClick(e)}
      >
        <div className="flex items-center space-x-2 drop-shadow-2xl filter ">
          <Iconify
            fontSize={item.id ? '1.5em' : '1.3em'}
            className={` 
                ${
                  isOpen && !item.link
                    ? 'text-primary/90'
                    : isMatch
                      ? 'text-primary'
                      : 'text-muted-foreground '
                }`}
            icon={
              item.icon
                ? item.icon
                : item.children
                  ? 'material-symbols:circle-outline'
                  : 'material-symbols:circle'
            }
          />
          <p className="m-0 p-0">{item[idName]}</p>
        </div>
        {item.children && (
          <Iconify
            fontSize={'1.5em'}
            className={isOpen ? 'iconPrimary' : 'text-muted-foreground '}
            icon={
              isOpen
                ? 'material-symbols:keyboard-arrow-down'
                : 'material-symbols:keyboard-arrow-right'
            }
          />
        )}
      </div>
      {isOpen && children && <div className="ml-2">{children}</div>}
    </Container>
  );
};

interface Props {
  data: ListDropdownDataType[];
  idName?: string;
}

const ListDropdown: FC<Props> = ({ data, idName = 'name' }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const pathname = usePathname();
  const handleToggle = (name: string) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(name)
        ? prevOpenItems.filter((itemStr) => itemStr !== name)
        : [...prevOpenItems, name]
    );
  };

  const checkMatch = (
    item: ListDropdownDataType,
    pathname: string | null
  ): boolean => {
    if (item.link === pathname) {
      return true;
    }
    return item.children
      ? item.children.some((child) => checkMatch(child, pathname))
      : false;
  };
  const renderItems = (
    items: ListDropdownDataType[],
    idName: string
  ): ReactNode => {
    return items.map((item) => {
      const isChildMatch = item.children?.some((child) =>
        checkMatch(child, pathname)
      );

      return (
        <ItemComponent
          key={item[idName]}
          item={item}
          idName={idName}
          isOpen={openItems.includes(item[idName])}
          onClick={handleToggle}
          pathname={pathname}
          isChildMatch={isChildMatch || false} //for parent
        >
          {item.children && (
            <div className="flex flex-col mt-1 space-y-2">
              {renderItems(item.children, idName)}
            </div>
          )}
        </ItemComponent>
      );
    });
  };

  return (
    <div className="w-full mt-6">
      <div className="flex flex-col mx-6 space-y-3">
        {renderItems(data, idName)}
      </div>
    </div>
  );
};

export default ListDropdown;
