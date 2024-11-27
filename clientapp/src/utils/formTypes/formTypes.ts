import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export type loginTypes = z.infer<typeof loginSchema>;
