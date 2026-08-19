import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { createTaskSchema } from './create-task-schema'
import type { CreateTaskInput } from './types'

const validInput: CreateTaskInput = {
  title: 'Изучить React',
  deadline: '2026-08-25',
  status: 'todo',
  priority: 'medium',
  tag: 'React',
  assignee: 'Иван',
  space: 'Обучение',
}

describe('createTaskSchema', () => {
  test('принимает корректные данные', () => {
    const result = createTaskSchema.safeParse(validInput)

    expect(result.success).toBe(true)
  })

  test('удаляет пробелы по краям названия', () => {
    const result = createTaskSchema.safeParse({
      ...validInput,
      title: ' Изучить React    ',
    })

    expect(result.success).toBe(true)

    if (!result.success) {
      throw new Error('Ожидался успешный результат валидации')
    }

    expect(result.data.title).toBe('Изучить React')
  })

  test('не принимает пустое название', () => {
    const result = createTaskSchema.safeParse({
      ...validInput,
      title: ' ',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации названия')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.title).toContain('Введите название задачи')
  })

  test('не принимает пустой дедлайн', () => {
    const result = createTaskSchema.safeParse({
      ...validInput,
      deadline: '',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации срока')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.deadline).toContain('Выберите срок выполнения')
  })
})
