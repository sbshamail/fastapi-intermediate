'use client';
import React, { FC } from 'react';
//

import Iconify from '@/@core/common/icon';
import { loginSchema, loginTypes } from '@/utils/interfaces/formTypes/authformTypes';
import { useReactForm } from '@/@core/packages/reactHookForm/useReactForm';
import TextField from '../textField/TextField';
import Checkbox from '../textField/Checkbox';
import Button from '../button';

interface PropsType {
  removeSelection: () => void;
}

const SampleLoginForm: FC<PropsType> = ({ removeSelection }) => {
  const { register, handleSubmit, errors, reset } =
    useReactForm<loginTypes>(loginSchema);

  const onSubmit = (data: loginTypes) => {
    // Handle form submission
    console.log('Form submitted successfully', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        type="email"
        label="Email"
        className="w-full"
        name="email"
        register={register}
        errors={errors}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        register={register}
        errors={errors}
        className="w-full"
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox />
          <label className="text-muted-foreground text-sm">Remember me</label>
        </div>
        <p className="text-muted-foreground text-sm hover:text-ring cursor-pointer">
          Forget Password
        </p>
      </div>
      <div className="flex space-x-2 items-center">
        <Button type="submit" size="3">
          Login
        </Button>
        <p className='text-sm text-muted-foreground"'>or login with</p>
        <Iconify hover icon="mdi:google" />
        <Iconify hover icon="mdi:facebook" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a href="#" className="text-primary/50 hover:text-ring">
            Sign up now
          </a>
        </p>
      </div>
    </form>
  );
};

export default SampleLoginForm;
