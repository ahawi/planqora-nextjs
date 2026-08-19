import { describe, expect, test } from 'vitest'

import { createTask } from './create-task'
import type { CreateTaskInput } from './types'

describe('createTask', () => {
  test('создаёт задачу с переданным id и значениями по умолчанию', () => {
    const input: CreateTaskInput = {
      title: 'Изучить React',
      deadline: '2026-08-25',
      status: 'todo',
      priority: 'medium',
      tag: 'React',
      assignee: 'Иван',
      space: 'Обучение',
    }

    const result = createTask(input, 'task-new')

    expect(result).toEqual({
      ...input,
      id: 'task-new',
      comments: 0,
      progress: 0,
      coverTone: 'primary',
    })
  })
})
