import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { signUpSchema } from './sign-up-schema'
import type { SignUpInput } from './types'

const validInput: SignUpInput = {
  name: 'Иван',
  email: 'ivan@example.com',
  password: 'password123',
  confirmPassword: 'password123',
}

describe('signUpSchema', () => {
  test('принимает корректные данные', () => {
    const result = signUpSchema.safeParse(validInput)

    expect(result.success).toBe(true)
  })

  test('удаляет пробелы по краям имени', () => {
    const result = signUpSchema.safeParse({
      ...validInput,
      name: '  Иван  ',
    })

    expect(result.success).toBe(true)

    if (!result.success) {
      throw new Error('Ожидался успешный результат валидации')
    }

    expect(result.data.name).toBe('Иван')
  })

  test('не принимает некорректный email', () => {
    const result = signUpSchema.safeParse({
      ...validInput,
      email: 'not-an-email',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации email')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.email).toBeDefined()
  })

  test('не принимает короткий пароль', () => {
    const result = signUpSchema.safeParse({
      ...validInput,
      password: '1234567',
      confirmPassword: '1234567',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации пароля')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.password).toContain('Минимум 8 символов')
  })

  test('требует подтверждение пароля', () => {
    const result = signUpSchema.safeParse({
      ...validInput,
      confirmPassword: '',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка подтверждения пароля')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.confirmPassword).toContain('Повторите пароль')
  })

  test('привязывает ошибку несовпадающих паролей к подтверждению', () => {
    const result = signUpSchema.safeParse({
      ...validInput,
      confirmPassword: 'different-password',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка несовпадающих паролей')
    }

    expect(result.error.issues).toContainEqual(
      expect.objectContaining({
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
      }),
    )
  })
})
