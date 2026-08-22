import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { signInSchema } from './sign-in-schema'
import type { SignInInput } from './types'

const validInput: SignInInput = {
  email: 'ivan@example.com',
  password: 'password123',
}

describe('signInSchema', () => {
  test('принимает корректные данные', () => {
    const result = signInSchema.safeParse(validInput)

    expect(result.success).toBe(true)
  })

  test('не принимает некорректный email', () => {
    const result = signInSchema.safeParse({
      ...validInput,
      email: 'not-an-email',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации email')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.email).toContain('Введите корректный email')
  })

  test('не принимает пустой пароль', () => {
    const result = signInSchema.safeParse({
      ...validInput,
      password: '',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации пароля')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.password).toContain('Введите пароль')
  })
})
