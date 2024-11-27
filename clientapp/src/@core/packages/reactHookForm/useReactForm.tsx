import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';

export const useReactForm = <T extends FieldValues>(schema: z.ZodSchema<T>) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    resolver: zodResolver(schema),
  });
  return { register, control, handleSubmit, errors, reset };
};
