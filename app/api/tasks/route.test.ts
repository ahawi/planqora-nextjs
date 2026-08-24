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

  test('возвращает задачи текущего пользователя', async () => {
    const deadline = new Date('2026-08-30T00:00:00.000Z')
    const tasks = [
      {
        id: 'task-1',
        title: 'Собрать API',
        deadline,
        status: 'TODO',
        priority: 'HIGH',
        tag: 'Разработка',
        progress: 50,
        commentsCount: 2,
        space: {
          id: 'space-1',
          title: 'Редизайн сайта',
        },
      },
    ]

    findManyMock.mockResolvedValue(tasks)

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({
      tasks: [
        {
          ...tasks[0],
          deadline: deadline.toISOString(),
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
        assignee: true,
        progress: true,
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

  test('возвращает 500 при ошибке базы данных', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'))

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({ error: 'Internal server error' })
  })
})
