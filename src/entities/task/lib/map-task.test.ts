import { describe, expect, test } from 'vitest'

import { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'

import { mapTaskDTO } from './map-task'

const taskDTO = {
  assignee: 'Иван',
  commentsCount: 3,
  deadline: new Date('2026-08-30T00:00:00.000Z'),
  id: 'task-1',
  priority: TaskPriority.HIGH,
  progress: 75,
  space: {
    id: 'space-1',
    title: 'Редизайн сайта',
  },
  status: TaskStatus.TODO,
  tag: 'Разработка',
  title: 'Подключить API',
}

describe('mapTaskDTO', () => {
  test('преобразует Prisma-задачу в модель интерфейса', () => {
    const result = mapTaskDTO(taskDTO)

    expect(result).toEqual({
      assignee: 'Иван',
      comments: 3,
      coverTone: 'warning',
      deadline: '2026-08-30',
      id: 'task-1',
      priority: 'high',
      progress: 75,
      space: 'Редизайн сайта',
      status: 'todo',
      tag: 'Разработка',
      title: 'Подключить API',
    })
  })

  test.each([
    [TaskStatus.BACKLOG, 'backlog'],
    [TaskStatus.TODO, 'todo'],
    [TaskStatus.IN_PROGRESS, 'in-progress'],
    [TaskStatus.DONE, 'done'],
  ] as const)('преобразует статус', (status, expectedStatus) => {
    const result = mapTaskDTO({
      ...taskDTO,
      status,
    })

    expect(result.status).toBe(expectedStatus)
  })

  test.each([
    [TaskPriority.LOW, 'low', 'primary'],
    [TaskPriority.MEDIUM, 'medium', 'primary'],
    [TaskPriority.HIGH, 'high', 'warning'],
  ] as const)(
    'преобразует приоритет',
    (priority, expectedPriority, expectedCoverTone) => {
      const result = mapTaskDTO({
        ...taskDTO,
        priority,
      })

      expect(result.priority).toBe(expectedPriority)
      expect(result.coverTone).toBe(expectedCoverTone)
    },
  )

  test('преобразует дату в формат yyyy-mm-dd', () => {
    const result = mapTaskDTO({
      ...taskDTO,
      deadline: new Date('2026-12-05T18:30:00.000Z'),
    })

    expect(result.deadline).toBe('2026-12-05')
  })
})
