import React, { FC, useState } from 'react';
import SimpleModal from '@/@core/common/modals/SimpleModel';
import Image from 'next/image';

import Button from '../button';
import LoginForm from '../../forms/authForm/LoginForm';
import SignupForm from '@/components/forms/authForm/SignupForm';
// import SampleLoginForm from '../_forms/SampleLoginForm';
import Shadow from '@/@core/tag/Shadow';
interface PropsType {
  open: boolean;
  closeModal: () => void;
}
const LoginModalCard: FC<PropsType> = ({ open, closeModal }) => {
  const [toggleSignup, SetToggleSignup] = useState(false);

  // Form Redirect Button on condition
  const RedirectForm = () => (
    <div>
      <p className="text-sm text-muted-foreground">
        {toggleSignup ? 'Already have an account? ' : "Don't have an account? "}

        <button
          className="text-primary/50 hover:text-ring Transition underline"
          onClick={() => SetToggleSignup(toggleSignup ? false : true)}
        >
          {toggleSignup ? 'Login' : 'Sign up now'}
        </button>
      </p>
    </div>
  );
  return (
    <SimpleModal open={open} close={closeModal} clickOutside={false}>
      <div className="w-full relative h-max ">
        <Shadow
          space="2"
          className=" shadow-lg  h-max relative overflow-hidden rounded-full p-32"
        >
          <div className="flex lg:flex-row  flex-col justify-between lg:justify-end lg:items-center">
            <div className="p-2 lg:w-1/2 w-full ">
              {!toggleSignup ? (
                <>
                  <LoginForm removeSelection={closeModal} />
                  <RedirectForm />
                </>
              ) : (
                <>
                  <SignupForm
                    removeSelection={() => {
                      SetToggleSignup(false);
                    }}
                  />
                  <RedirectForm />
                </>
              )}
            </div>

            {/* absolute close button to close modal */}
            <div className="lg:absolute w-full bottom-0 left-1/2 lg:-translate-x-1/2 ">
              <Button
                variant="secondary"
                className="w-full "
                onClick={closeModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Shadow>
        {/* absolute cart image */}
        <div className="absolute lg:left-0 lg:bottom-28 bottom-[80%] left-10">
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
