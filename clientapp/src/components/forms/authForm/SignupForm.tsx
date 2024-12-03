'use client';
import React, { FC } from 'react';
//cui
import TextField from '../../@cui/textField/TextField';
import Button from '../../@cui/button';
//utils
import {
  signupSchema,
  SignupTypes,
} from '@/utils/interfaces/formTypes/authformTypes';
import { removeUndefined } from '@/utils/helper';
import { mutationAction } from '@/utils/action/rtkAction';
//common
import Iconify from '@/@core/common/icon';
//hook
import { useReactForm } from '@/@core/packages/reactHookForm/useReactForm';
// store
import { useSignupMutation } from '@/lib/store/services/auth';
interface PropsType {
  removeSelection: () => void;
}

const SignupForm: FC<PropsType> = ({ removeSelection }) => {
  const { register, handleSubmit, errors, reset } =
    useReactForm<SignupTypes>(signupSchema);
  const [signup] = useSignupMutation();
  const onSubmit = async (data: SignupTypes) => {
    removeUndefined(data);
    await mutationAction({
      Query: signup, // Pass the signup mutation as the Query
      data: data, // Pass the data for signup
      reset,
      removeSelection,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="w-full grid lg:grid-cols-1 grid-cols-2 gap-4">
        <div>
          <TextField
            type="string"
            label="First Name"
            className="w-full"
            name="firstname"
            register={register}
            errors={errors}
            required
          />
        </div>
        <div>
          <TextField
            type="string"
            label="Last Name"
            className="w-full"
            name="lastname"
            register={register}
            errors={errors}
          />
        </div>
        <TextField
          required
          type="tel"
          label="Phone"
          className="w-full"
          name="phone"
          register={register}
          errors={errors}
        />
        <TextField
          required
          type="email"
          label="Email"
          className="w-full"
          name="email"
          register={register}
          errors={errors}
        />

        <TextField
          required
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextField
          required
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <div className="flex space-x-2 items-center">
        <Button type="submit" size="3">
          Register
        </Button>
        <p className='text-sm text-muted-foreground"'>or Signup with</p>
        <Iconify hover icon="mdi:google" />
        <Iconify hover icon="mdi:facebook" />
      </div>
    </form>
  );
};

export default SignupForm;
