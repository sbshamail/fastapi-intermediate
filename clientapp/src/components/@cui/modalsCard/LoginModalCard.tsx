import React, { FC } from 'react';
import SimpleModal from '@/@core/common/modals/SimpleModel';
import Image from 'next/image';

import Button from '../button';
import LoginForm from '../forms/LoginForm';
import Shadow from '@/@core/tag/Shadow';
interface PropsType {
  open: boolean;
  handleModal: (b: boolean) => void;
}
const LoginModalCard: FC<PropsType> = ({ open, handleModal }) => {
  return (
    <SimpleModal
      open={open}
      close={() => handleModal(false)}
      clickOutside={false}
    >
      <div className="w-full relative h-max ">
        <Shadow
          space="2"
          className=" shadow-lg  h-max relative overflow-hidden rounded-full p-32"
        >
          <div className="flex lg:flex-row  flex-col justify-between lg:justify-end lg:items-center">
            <div className="p-2 lg:w-1/2 w-full">
              <LoginForm removeSelection={() => handleModal(false)} />
            </div>

            {/* absolute close button to close modal */}
            <div className="lg:absolute w-full bottom-0 left-1/2 lg:-translate-x-1/2 ">
              <Button
                variant="secondary"
                className="w-full "
                onClick={() => handleModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Shadow>
        {/* absolute cart image */}
        <div className="absolute lg:left-0 lg:bottom-28 bottom-[70%] left-10">
          <Image
            className="lg:w-full w-72"
            src={`/login/login.png?${new Date().getTime()}`}
            height={500}
            width={500}
            alt="mhmarket login screen"
          />
        </div>
      </div>
    </SimpleModal>
  );
};

export default LoginModalCard;
