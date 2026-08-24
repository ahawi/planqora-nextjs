import { beforeEach, describe, expect, test, vi } from 'vitest'

import { GET } from './route'

const { findManyMock, getSessionMock } = vi.hoisted(() => ({
  findManyMock: vi.fn(),
  getSessionMock: vi.fn(),
}))

vi.mock('@/src/shared/lib/server/auth', () => ({
  auth: {
    api: {
      getSession: getSessionMock,
    },
  },
}))

vi.mock('@/src/shared/lib/server/prisma', () => ({
  prisma: {
    task: {
      findMany: findManyMock,
    },
  },
}))

const createRequest = () => new Request('http://localhost/api/tasks')

describe('GET /api/tasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getSessionMock.mockResolvedValue({
      user: {
        id: 'user-1',
      },
    })

    findManyMock.mockResolvedValue([])
  })

  test('возвращает 401 без авторизации', async () => {
    getSessionMock.mockResolvedValue(null)

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({ error: 'Unauthorized' })
    expect(findManyMock).not.toHaveBeenCalled()
  })

  test('возвращает 500 при ошибке базы данных', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'))

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({ error: 'Internal server error' })
  })

  test('возвращает преобразованные задачи текущего пользователя', async () => {
    const tasks = [
      {
        assignee: 'Иван',
        commentsCount: 2,
        deadline: new Date('2026-08-30T00:00:00.000Z'),
        id: 'task-1',
        priority: 'HIGH',
        progress: 50,
        space: {
          id: 'space-1',
          title: 'Редизайн сайта',
        },
        status: 'TODO',
        tag: 'Разработка',
        title: 'Собрать API',
      },
    ]

    findManyMock.mockResolvedValue(tasks)

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({
      tasks: [
        {
          assignee: 'Иван',
          comments: 2,
          coverTone: 'warning',
          deadline: '2026-08-30',
          id: 'task-1',
          priority: 'high',
          progress: 50,
          space: 'Редизайн сайта',
          status: 'todo',
          tag: 'Разработка',
          title: 'Собрать API',
        },
      ],
    })
    expect(findManyMock).toHaveBeenCalledWith({
      where: {
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
      orderBy: {
        createdAt: 'desc',
      },
    })
  })
})
