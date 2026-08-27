import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { TaskStatus } from '@/src/generated/prisma/enums'

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

const createRequest = () => new Request('http://localhost/api/dashboard')

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-08-26T12:00:00.000Z'))

  getSessionMock.mockResolvedValue({
    user: {
      id: 'user-1',
    },
  })

  findManyMock.mockResolvedValue([])
})

afterEach(() => {
  vi.useRealTimers()
})

describe('GET /api/dashboard', () => {
  test('возвращает 401 без авторизации', async () => {
    getSessionMock.mockResolvedValue(null)

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body).toEqual({
      error: 'Unauthorized',
    })

    expect(findManyMock).not.toHaveBeenCalled()
  })

  test('возвращает статистику задач текущего пользователя', async () => {
    findManyMock.mockResolvedValue([
      {
        status: TaskStatus.TODO,
        createdAt: new Date('2026-08-25T10:00:00.000Z'),
        completedAt: null,
      },
      {
        status: TaskStatus.DONE,
        createdAt: new Date('2026-08-20T10:00:00.000Z'),
        completedAt: new Date('2026-08-26T10:00:00.000Z'),
      },
    ])

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(200)

    expect(body.stats).toEqual(
      expect.objectContaining({
        totalTasks: 2,
        activeTasks: 1,
        activePercent: 50,
      }),
    )

    expect(body.stats.activity).toHaveLength(7)

    expect(body.stats.activity).toEqual(
      expect.arrayContaining([
        {
          date: '2026-08-20',
          label: 'Чт',
          created: 1,
          completed: 0,
        },
        {
          date: '2026-08-25',
          label: 'Вт',
          created: 1,
          completed: 0,
        },
        {
          date: '2026-08-26',
          label: 'Ср',
          created: 0,
          completed: 1,
        },
      ]),
    )

    expect(findManyMock).toHaveBeenCalledWith({
      where: {
        space: {
          ownerId: 'user-1',
        },
      },
      select: {
        status: true,
        createdAt: true,
        completedAt: true,
      },
    })
  })

  test('возвращает 500 при ошибке базы данных', async () => {
    findManyMock.mockRejectedValue(new Error('Database error'))

    const response = await GET(createRequest())
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body).toEqual({
      error: 'Internal server error',
    })
  })
})
