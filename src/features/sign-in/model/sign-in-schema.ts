import { z } from 'zod'

import { type SignInInput } from './types'

export const signInSchema = z.object({
  email: z.email('Введите корректный email'),
  password: z.string().min(1, 'Введите пароль'),
}) satisfies z.ZodType<SignInInput>
