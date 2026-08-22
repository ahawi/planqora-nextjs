import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { editTaskSchema } from './edit-task-schema'
import type { EditTaskInput } from './types'

const validInput: EditTaskInput = {
  title: 'Обновить документацию',
  deadline: '2026-08-25',
  status: 'in-progress',
  priority: 'high',
  tag: 'Документация',
  assignee: 'Иван',
  space: 'Planqora',
}

describe('editTaskSchema', () => {
  test('принимает корректные данные', () => {
    const result = editTaskSchema.safeParse(validInput)

    expect(result.success).toBe(true)
  })

  test('удаляет пробелы по краям строковых полей', () => {
    const result = editTaskSchema.safeParse({
      ...validInput,
      title: '  Обновить документацию  ',
      tag: '  Документация  ',
      assignee: '  Иван  ',
      space: '  Planqora  ',
    })

    expect(result.success).toBe(true)

    if (!result.success) {
      throw new Error('Ожидался успешный результат валидации')
    }

    expect(result.data).toMatchObject({
      title: 'Обновить документацию',
      tag: 'Документация',
      assignee: 'Иван',
      space: 'Planqora',
    })
  })

  test('не принимает пустое название', () => {
    const result = editTaskSchema.safeParse({
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

  test('не принимает название длиннее 100 символов', () => {
    const result = editTaskSchema.safeParse({
      ...validInput,
      title: 'а'.repeat(101),
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка максимальной длины названия')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.title).toContain(
      'Название не должно превышать 100 символов',
    )
  })

  test('не принимает пустой дедлайн', () => {
    const result = editTaskSchema.safeParse({
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
