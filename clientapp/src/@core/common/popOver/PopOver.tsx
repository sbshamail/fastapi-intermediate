'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { usePopOver } from '@/@core/customHooks/usePopOver';
import Iconify from '../icon';

interface PopOverProps {
  children: ReactNode;
  toggle?: boolean;
  style?: 'dropdown' | 'popover';
  layout?: 'open' | 'fixed' | 'close';
  mouseTrigger?: boolean;
}

export const PopOver: FC<PopOverProps> = ({
  children,
  toggle,
  style,
  layout,
  mouseTrigger,
}) => {
  const {
    open,
    divRef,
    setOpen,
    dropdownPositionClass,
    dropdownLeftPositionClass,
    shouldOpenUpwards,
  } = usePopOver();
  useEffect(() => {
    if (layout === 'open') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [layout, setOpen]);
  return (
    <div className="relative " ref={divRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            setOpen,
            open,
            divRef,
            dropdownPositionClass,
            shouldOpenUpwards,
            dropdownLeftPositionClass,
            toggle,
            style,
            layout,
            mouseTrigger,
          } as any);
        }
        return child;
      })}
    </div>
  );
};

interface PopOverTriggerProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  shouldOpenUpwards: boolean;
  style?: string;
  divRef: React.RefObject<HTMLDivElement>;
  mouseTrigger: boolean;
}

export const PopOverTrigger: FC<Partial<PopOverTriggerProps>> = ({
  children,
  open,
  setOpen,
  shouldOpenUpwards,
  style,
  mouseTrigger,
}) => {
  const handleTrigger = () => {
    if (setOpen) {
      setOpen(!open);
    }
  };
  const content = () => (
    <div className=" cursor-pointer ">
      {style === 'dropdown' ? null : (
        <>
          {open && !shouldOpenUpwards && (
            <div className=" absolute top-[80%] ">
              <Iconify
                fontSize="2rem"
                icon="iconamoon:arrow-up-2-thin"
                className="text-shadow-md opacity-50 iconPrimary "
              />
            </div>
          )}
          {open && shouldOpenUpwards && (
            <div className=" absolute bottom-[80%]">
              <Iconify
                fontSize="2rem"
                icon="iconamoon:arrow-down-2-thin"
                className="text-shadow-md opacity-50 iconPrimary"
              />
            </div>
          )}
        </>
      )}
      <div>{children}</div>
    </div>
  );
  return (
    <div className="relative">
      {!mouseTrigger ? (
        <div onClick={handleTrigger}>{content()}</div>
      ) : (
        <div onMouseEnter={handleTrigger}>{content()}</div>
      )}
    </div>
  );
};

interface PopOverContentProps {
  children: ReactNode;
  divRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
  dropdownPositionClass: string;
  dropdownLeftPositionClass: string;
  toggle?: boolean;
  style?: string;
  layout?: string;
  mouseTrigger?: boolean;
}

export const PopOverContent: FC<Partial<PopOverContentProps>> = ({
  children,
  open,
  setOpen,
  dropdownPositionClass,
  dropdownLeftPositionClass,
  toggle,
  style,
  layout,
  mouseTrigger,
}) => {
  return open || layout === 'fixed' ? (
    <div
      onMouseLeave={() => (mouseTrigger && setOpen ? setOpen(false) : {})}
      onClick={() => (toggle ? setOpen && setOpen(false) : null)}
    >
      <div
        className={` absolute min-w-max z-popOver  ${
          style === 'dropdown' ? 'w-full' : `w-auto my-3 `
        } ${dropdownLeftPositionClass}  ${dropdownPositionClass} `}
      >
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};
