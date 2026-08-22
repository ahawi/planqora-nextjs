import { z } from 'zod'

import { type SignUpInput } from './types'

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, 'Минимум 2 символа'),
    email: z.email(),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirmPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  }) satisfies z.ZodType<SignUpInput>
