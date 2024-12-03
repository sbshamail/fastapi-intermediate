import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});
export type LoginTypes = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    firstname: z.string().min(1, 'First Name is required'), // `firstname` is required
    lastname: z.string().optional(),
    phone: z
      .string()
      .regex(
        /^\d{11}$/,
        'Phone must contain only numbers and be 11 digits long'
      ),

    email: z.string().email(),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
export type SignupTypes = z.infer<typeof signupSchema>;
