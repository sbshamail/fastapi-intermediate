'use client';
import Iconify from '@/@core/common/icon';
import { ChildrenTypes } from '@/utils/interfaces/commonTypes';
import React, { FC, useEffect, useRef, useState } from 'react';

interface Props extends ChildrenTypes {
  title: string;
  defaultOpen?: boolean;
}
const Accordion: FC<Props> = ({ children, title, defaultOpen = true }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = open
        ? `${contentRef.current.scrollHeight}px`
        : '0px';
    }
  }, [open]);
  return (
    <div className="w-full">
      <div
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between "
      >
        <h3 className="px-4 text-lg font-bold">{title}</h3>
        {open ? (
          <Iconify icon="iconamoon:arrow-down-2-light" />
        ) : (
          <Iconify icon="iconamoon:arrow-right-2-light" />
        )}
      </div>

      <div
        className={`transition-all ease-in-out duration-1000 ${
          open ? 'h-auto' : 'h-0 hidden'
        }`}
      >
        <hr className="w-full border-border m-0 p-0 my-3 " />
        <div className="px-4 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
