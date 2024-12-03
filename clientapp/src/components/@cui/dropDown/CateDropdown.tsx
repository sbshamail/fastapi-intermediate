'use client';
import React, { FC, useState } from 'react';
import { ClassNameTypes } from '@/utils/interfaces/commonTypes';
import {
  PopOver,
  PopOverContent,
  PopOverTrigger,
} from '@/@core/common/popOver/PopOver';
import Shadow from '@/@core/tag/Shadow';
import Iconify from '@/@core/common/icon';
import { usePathname, useRouter } from 'next/navigation';
import { CustomLink } from '@/@core/tag/CustomLink';
import { CategoryDataType } from '@/utils/interfaces/responseTypes/responseTypes';
import useGetWindow from '@/@core/customHooks/useGetWindow';
import { categoriesTrigger } from '@/components/layout/navbar/midNavbar/function';

interface Props extends ClassNameTypes {
  icon?: string;
  iconClass?: React.ComponentProps<'div'>['className'];
  title?: string;
  titleClass?: React.ComponentProps<'div'>['className'];
  contents?: CategoryDataType[];
  idName?: string;
}
const CateDropdown: FC<Props> = ({
  icon,
  title,
  className,
  iconClass,
  titleClass,
  contents,
  idName = 'name',
}) => {
  const [subCat, setSubCat] = useState<CategoryDataType | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const conditionFunc = (window: Window) => window.scrollY === 0;
  const { condition } = useGetWindow(['scroll'], conditionFunc);

  const layout = pathname === '/' && condition ? 'fixed' : 'close';

  return (
    <div className="w-max">
      <PopOver style="dropdown" layout={layout}>
        <PopOverTrigger>
          {categoriesTrigger ? (
            categoriesTrigger()
          ) : (
            <div className={`flex space-x-1  items-center  ${className}`}>
              {icon && <Iconify icon={icon} className={`${iconClass}`} />}
              {title && (
                <p className={`m-0 p-0  uppercase font-semibold ${titleClass}`}>
                  {title}
                </p>
              )}
            </div>
          )}
        </PopOverTrigger>
        <PopOverContent>
          <Shadow space="0" className="relative">
            <div className="flex flex-col max-h-80 overflow-auto">
              {contents &&
                contents?.length > 0 &&
                contents?.map((content: CategoryDataType, index: number) => (
                  <CustomLink
                    key={index}
                    // onClick={() => handleRoute(`?categories=${content.name}`)}
                    href={`/product/?categories=${content[idName]}` || '#'}
                  >
                    <div
                      className="relative w-full px-2 py-3  cursor-pointer hover:bg-accent"
                      onMouseEnter={() => setSubCat(content)}
                    >
                      <div className="flex items-center space-x-2 justify-between ">
                        <div className="flex items-center space-x-2">
                          {content?.icon && (
                            <Iconify fontSize="0.9rem" icon={content.icon} />
                          )}
                          <span className="text-sm">{content[idName]}</span>
                        </div>
                        {content?.children && (
                          <Iconify
                            fontSize="0.9rem"
                            icon="weui:arrow-outlined"
                          />
                        )}
                      </div>
                    </div>
                  </CustomLink>
                ))}
            </div>
            {subCat?.children ? (
              <div
                onMouseLeave={() => setSubCat(null)}
                className="absolute left-full top-0"
                style={{
                  width: `calc(190px * ${Math.min(subCat.children.length, 3)})`,
                }}
              >
                <Shadow space="0" className="flex flex-wrap ">
                  {subCat?.children?.map(
                    (subContent: CategoryDataType, index: number) => (
                      <div key={index} className=" w-[190px] ">
                        <CustomLink
                          href={
                            `/product/?categories=${subCat[idName]}-${subContent[idName]}` ||
                            '#'
                          }
                        >
                          <div className="w-full p-2 flex items-center space-x-2  py-3 cursor-pointer hover:bg-accent">
                            {subContent?.icon && (
                              <Iconify
                                fontSize="0.9rem"
                                icon={subContent.icon}
                              />
                            )}
                            <span className="text-sm font-bold  ">
                              {subContent[idName]}
                            </span>
                          </div>
                        </CustomLink>
                        <div className="flex flex-col ">
                          {subContent?.children?.map(
                            (item: CategoryDataType, index: number) => (
                              <CustomLink
                                key={index}
                                href={
                                  `/product/?categories=${subCat[idName]}-${subContent[idName]}-${item[idName]}` ||
                                  '#'
                                }
                              >
                                <div className="p-2 text-sm cursor-pointer hover:underline">
                                  {item[idName]}
                                </div>
                              </CustomLink>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </Shadow>
              </div>
            ) : null}
          </Shadow>
        </PopOverContent>
      </PopOver>
    </div>
  );
};

export default CateDropdown;
