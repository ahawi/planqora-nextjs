import { describe, expect, test } from 'vitest'

import { getTaskDueLabel } from './get-task-due-label'

const currentDate = new Date('2026-08-17T12:00:00Z')

describe('getTaskDueLabel', () => {
  test('показывает срок для активной задачи', () => {
    const result = getTaskDueLabel(
      { deadline: '2026-08-19', status: 'todo' },
      currentDate,
    )

    expect(result).toBe('Осталось 2 дня')
  })

  test('показывает статус для завершённой задачи', () => {
    const result = getTaskDueLabel(
      { deadline: '2026-08-10', status: 'done' },
      currentDate,
    )

    expect(result).toBe('Выполнено')
  })
})
