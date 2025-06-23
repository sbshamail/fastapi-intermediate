'use client';
import React, { FC, useEffect, useState } from 'react';
import useClickOutside from '@/@core/customHooks/useClickOutside';
import Button from '../button';
import Card from '@/@core/tag/Card';

interface Props {
  open: boolean;
  close: (b: boolean) => void;
  children?: React.ReactNode;
  clickOutside?: boolean;
}
const SimpleModal: FC<Props> = ({
  open,
  close,
  children,
  clickOutside = true,
}) => {
  const [opens, setOpens] = useState(false);

  useEffect(() => {
    // Disable scrolling when the modal is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup: ensure scrolling is re-enabled when the modal is unmounted or closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]); // Trigger effect when the `open` prop changes

  const toggle = () => {
    close(false);
  };
  const divRef = useClickOutside(toggle);
  const sample = () => (
    <Card>
      {' '}
      <p>Comming Soon</p>
      <div className="flex items-center">
        Modals:
        <div onClick={() => setOpens(true)} className="ms-2 cursor-pointer">
          <Button>Open Modal</Button>
        </div>
        <SimpleModal open={opens} close={setOpens}></SimpleModal>
      </div>
      <div className="w-full flex justify-end ">
        <Button variant="secondary" onClick={() => close(false)}>
          Close
        </Button>
      </div>
    </Card>
  );
  return (
    <div className="relative">
      {open && (
        <div className="fixed inset-0 h-screen w-full flex items-center justify-center z-modal ">
          <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur"></div>
          <div ref={clickOutside ? divRef : null} className="w-full z-10 ">
            <div className="w-full max-w-5xl mx-auto">
              <div>{children ? children : sample()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleModal;
