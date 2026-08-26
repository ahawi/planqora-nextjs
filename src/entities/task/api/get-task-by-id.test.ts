import { beforeEach, describe, expect, test, vi } from 'vitest'

import { TaskPriority, TaskStatus } from '@/src/generated/prisma/enums'

import { getTaskById } from './get-task-by-id'

const { findFirstMock } = vi.hoisted(() => ({
  findFirstMock: vi.fn(),
}))

vi.mock('@/src/shared/lib/server/prisma', () => ({
  prisma: {
    task: {
      findFirst: findFirstMock,
    },
  },
}))

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
  title: 'Перерисовать блоки меню',
}

describe('getTaskById', () => {
  beforeEach(() => {
    findFirstMock.mockReset()
  })

  test('возвращает задачу, принадлежащую пользователю', async () => {
    findFirstMock.mockResolvedValue(taskDTO)

    const result = await getTaskById({
      taskId: 'task-1',
      ownerId: 'user-1',
    })

    expect(findFirstMock).toHaveBeenCalledWith({
      where: {
        id: 'task-1',
        space: {
          ownerId: 'user-1',
        },
      },
      select: {
        id: true,
        title: true,
        deadline: true,
        status: true,
        priority: true,
        tag: true,
        progress: true,
        assignee: true,
        commentsCount: true,
        space: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

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
      title: 'Перерисовать блоки меню',
    })
  })

  test('возвращает null, если задача не найдена', async () => {
    findFirstMock.mockResolvedValue(null)

    const result = await getTaskById({
      taskId: 'missing-task',
      ownerId: 'user-1',
    })

    expect(result).toBeNull()
  })
})
