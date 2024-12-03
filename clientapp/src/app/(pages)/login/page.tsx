'use client';
import { useState } from 'react';
import React from 'react';
import Screen from '@/app/overlayer';
import LoginModalCard from '@/components/@cui/modalsCard/LoginModalCard';
const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = (b: boolean) => {
    setIsModalOpen(b);
  };
  return (
    <Screen>
      <LoginModalCard
        open={isModalOpen}
        closeModal={() => handleModal(false)}
      />
      <div>
        <p>
          You are not Authorize. Please{' '}
          <button
            className="underline text-primary/80 hover:text-primary Transtion"
            onClick={() => setIsModalOpen(true)}
          >
            Login/Signup
          </button>
        </p>
      </div>
    </Screen>
  );
};

export default Login;
