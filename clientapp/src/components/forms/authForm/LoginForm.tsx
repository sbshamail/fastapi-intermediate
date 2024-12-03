'use client';
import React, { FC } from 'react';
//
import TextField from '../../@cui/textField/TextField';
import Button from '../../@cui/button';
import Checkbox from '../../@cui/textField/Checkbox';
import Iconify from '@/@core/common/icon';
import {
  loginSchema,
  LoginTypes,
} from '@/utils/interfaces/formTypes/authformTypes';
import { useReactForm } from '@/@core/packages/reactHookForm/useReactForm';
// redux
import { setReducer } from '@/lib/store/common/action-reducer';
import { useDispatch } from 'react-redux';
//fetching
import { fetchPost } from '@/utils/action/function';
//cookie
import { createCookie } from '@/app/cookies';
import { redirect } from 'next/navigation';
//
import useQuery from '@/@core/customHooks/useQuery';

interface PropsType {
  removeSelection: () => void;
}

const LoginForm: FC<PropsType> = ({ removeSelection }) => {
  // react hook form
  const { register, handleSubmit, errors, reset, watch } =
    useReactForm<LoginTypes>(loginSchema);
  const dispatch = useDispatch();
  const { getQuery, deleteQueryAll } = useQuery();
  const setAuth = setReducer('auth');

  const onSubmit = async (data: LoginTypes) => {
    const response = await fetchPost({
      data: data,
      reset,
      removeSelection,
      app: 'authapp',
      route: 'login',
      dispatch,
      fetchData: setAuth,
      pickValues: ['access_token', 'refresh_token', 'user', 'exp'],
    });
    if (response) {
      const { access_token, refresh_token, exp, user } = response;
      createCookie('access_token', access_token);
      createCookie('refresh_token', refresh_token);
      createCookie('exp', exp);
      createCookie('user', user);
      const redirectUrl = getQuery('redirect');
      if (redirectUrl) {
        redirect('/');
      }
    }
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
    </form>
  );
};

export default LoginForm;
