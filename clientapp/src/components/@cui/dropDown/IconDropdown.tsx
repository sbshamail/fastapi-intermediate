'use client';
import {
  PopOver,
  PopOverContent,
  PopOverTrigger,
} from '@/@core/common/popOver/PopOver';
import Iconify from '@/@core/common/icon';
import Shadow from '@/@core/tag/Shadow';

import React, { FC } from 'react';

export interface ContentItem {
  [key: string]: any;
  icon?: string;
  title: string;
  click?: () => void;
}
interface Props {
  icon?: string;
  customIcon?: () => React.ReactNode;
  contents?: ContentItem[];
  contentId?: string;
  style?: 'dropdown' | 'popover';
  title?: string;
}

const IconDropdown: FC<Props> = ({
  icon,
  title,
  contents = [
    {
      title: 'Create',
      icon: 'tabler:plus',
    },
    {
      title: 'Edit',
      icon: 'tabler:edit',
    },
  ],
  contentId = 'title',
  style,
  customIcon,
}) => {
  const handleToggle = (click?: () => void) => {
    if (click) {
      click();
    }
  };
  return (
    <>
      <PopOver style={style} toggle={true}>
        <PopOverTrigger>
          <div className="flex">
            {customIcon
              ? customIcon()
              : icon && (
                  <Iconify
                    fontSize="2rem"
                    icon={icon || 'mdi:call-to-action'}
                    className={`iconPrimary`}
                  />
                )}

            {title && title}
          </div>
        </PopOverTrigger>
        <PopOverContent>
          <Shadow space="0">
            <div className="flex flex-col">
              {contents?.map((content: ContentItem, index: number) => (
                <span
                  key={index}
                  className="w-full px-2 py-1 flex items-center space-x-2 cursor-pointer hover:bg-accent"
                  onClick={() => handleToggle(content?.click)}
                >
                  {content?.icon && (
                    <Iconify fontSize="0.9rem" icon={content.icon} />
                  )}
                  <span className="text-sm">{content[contentId]}</span>
                </span>
              ))}
            </div>
          </Shadow>
        </PopOverContent>
      </PopOver>
    </>
  );
};

export default IconDropdown;
