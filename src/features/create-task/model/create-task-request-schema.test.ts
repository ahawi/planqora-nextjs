import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { createTaskRequestSchema } from './create-task-request-schema'
import type { CreateTaskRequest } from './types'

const validInput: CreateTaskRequest = {
  title: 'Изучить React',
  deadline: '2026-08-25',
  status: 'todo',
  priority: 'medium',
  tag: 'React',
  assignee: 'Иван',
  spaceId: 'space-1',
}

describe('createTaskRequestSchema', () => {
  test('принимает корректные данные', () => {
    const result = createTaskRequestSchema.safeParse(validInput)

    expect(result.success).toBe(true)
  })

  test('удаляет пробелы по краям названия', () => {
    const result = createTaskRequestSchema.safeParse({
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
    const result = createTaskRequestSchema.safeParse({
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
    const result = createTaskRequestSchema.safeParse({
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

  test('не принимает несуществующую дату', () => {
    const result = createTaskRequestSchema.safeParse({
      ...validInput,
      deadline: '2026-02-31',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации даты')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.deadline).toContain('Введите корректную дату')
  })

  test('не принимает дату в формате DD-MM-YYYY', () => {
    const result = createTaskRequestSchema.safeParse({
      ...validInput,
      deadline: '25-08-2026',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка формата даты')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.deadline).toContain('Введите корректную дату')
  })

  test('не принимает пустой идентификатор пространства', () => {
    const result = createTaskRequestSchema.safeParse({
      ...validInput,
      spaceId: ' ',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Ожидалась ошибка валидации пространства')
    }

    const errors = z.flattenError(result.error)
    expect(errors.fieldErrors.spaceId).toContain('Не указано пространство')
  })

  test('не принимает неизвестный статус', () => {
    const result = createTaskRequestSchema.safeParse({
      ...validInput,
      status: 'blocked',
    })

    expect(result.success).toBe(false)
  })

  test('не принимает неизвестный приоритет', () => {
    const result = createTaskRequestSchema.safeParse({
      ...validInput,
      priority: 'critical',
    })

    expect(result.success).toBe(false)
  })
})
